process.env.NODE_ENV = 'development';

var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var detect = require('./utils/detectPort');
var prompt = require('./utils/prompt');
var openBrowser = require('./utils/openBrowser');
var config = require('../config/webpack.config.dev');
// Tools like Cloud9 rely on this
var DEFAULT_PORT = process.env.PORT || 9527;
var compiler;

var friendlySyntaxErrorLabel = 'Syntax error:';

function isLikelyASyntaxError(message) {
    return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

// This is a little hacky.
// It would be easier if webpack provided a rich error object.

function formatMessage(message) {
    return message
    // Make some common errors shorter:
        .replace(
            // Babel syntax error
            'Module build failed: SyntaxError:',
            friendlySyntaxErrorLabel
        )
        .replace(
            // Webpack file not found error
            /Module not found: Error: Cannot resolve 'file' or 'directory'/,
            'Module not found:'
        )
        // Internal stacks are generally useless so we strip them
        .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
        // Webpack loader names obscure CSS filenames
        .replace('./~/css-loader!./~/postcss-loader!', '');
}

function clearConsole() {
    process.stdout.write('\x1bc');
}

function setupCompiler(port) {
    compiler = webpack(config);

    compiler.plugin('done', function (stats) {
        // clearConsole();
        var hasErrors = stats.hasErrors();
        var hasWarnings = stats.hasWarnings();
        if (!hasErrors && !hasWarnings) {
            console.log(chalk.green('Compiled successfully!'));
            console.log();
            console.log('The app is running at http://localhost:' + port + '/');
            console.log();
            return;
        }

        var json = stats.toJson();
        var formattedErrors = json.errors.map(message =>
            'Error in ' + formatMessage(message)
        );
        var formattedWarnings = json.warnings.map(message =>
            'Warning in ' + formatMessage(message)
        );

        if (hasErrors) {
            console.log(chalk.red('Failed to compile.'));
            console.log();
            if (formattedErrors.some(isLikelyASyntaxError)) {
                // If there are any syntax errors, show just them.
                // This prevents a confusing ESLint parsing error
                // preceding a much more useful Babel syntax error.
                formattedErrors = formattedErrors.filter(isLikelyASyntaxError);
            }
            formattedErrors.forEach(message => {
                console.log(message);
                console.log();
            });
            // If errors exist, ignore warnings.
            return;
        }

        if (hasWarnings) {
            console.log(chalk.yellow('Compiled with warnings.'));
            console.log();
            formattedWarnings.forEach(message => {
                console.log(message);
                console.log();
            });

            console.log('You may use special comments to disable some warnings.');
            console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
            console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
        }
    });
}


function runDevServer(port) {
    new WebpackDevServer(compiler, {
        historyApiFallback: true,
        contentBase: "./dev",
        hot: true,
        publicPath: config.output.publicPath,
        quiet: true,
        watchOptions: {
            ignored: /node_modules/
        },
        proxy: {
            '/api/**': {
                target: 'https://api.wallstreetcn.com/v2',
                // ignorePath: true,
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/discussions-api/**': {
                target: 'https://api.wallstreetcn.com/hatano/v1/discussions',
                // ignorePath: true,
                pathRewrite: {
                    '^/discussions-api': ''
                },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/api-markets/**': {
                target: 'https://api-markets.wallstreetcn.com/v1',
                pathRewrite: {
                    '^/api-markets': ''
                },
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/forexdata/**': {
                target: 'https://forexdata.wallstreetcn.com',
                pathRewrite: {
                    '^/forexdata': ''
                },
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    }).listen(port,  (err, result) => {
        if (err) {
            return console.log(err);
        }

        // clearConsole();
        console.log(chalk.cyan('Starting the development server...'));
        console.log();
        openBrowser(port);
    });
}

function run(port) {
    setupCompiler(port);
    runDevServer(port);
}


detect(DEFAULT_PORT).then(port => {
    if (port === DEFAULT_PORT) {
        run(port);
        return;
    }
    clearConsole();
    var question =
        chalk.yellow('Something is already running at port ' + DEFAULT_PORT + '.') +
        '\n\nWould you like to run the app at another port instead?';

    prompt(question, true).then(shouldChangePort => {
        if (shouldChangePort) {
            run(port);
        }
    });
});
