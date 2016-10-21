import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';

export default
({once = false} = {}) => ComposedComponent => {
    class withDimension extends React.Component {
        state = {
        };

        componentDidMount() {
            this.mounted = true;
            const { bottom, top, left, right, width, height } = this.el.getBoundingClientRect();
            this.setState({
                bottom,
                top,
                left,
                right,
                width,
                height,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });

            window.addEventListener('resize', this.handleResize);
        }

        componentWillUnmount() {
            this.mounted = false;
            window.removeEventListener('resize', this.handleResize);
        }

        handleResize = debounce(() => {
            if (this.mounted) {
                if (once) {
                    return this.setState({
                        windowWidth: window.innerWidth,
                        windowHeight: window.innerHeight
                    });
                }

                const { bottom, top, left, right, width, height } = this.el.getBoundingClientRect();
                this.setState({
                    bottom,
                    top,
                    left,
                    right,
                    width,
                    height,
                    windowWidth: window.innerWidth,
                    windowHeight: window.innerHeight
                });
            }
        }, 200);

        mounted = false;

        bindRef = ref => {
            this.el = ReactDOM.findDOMNode(ref); // eslint-disable-line
        }

        render() {
            return <ComposedComponent ref={this.bindRef} {...this.props} dimension={this.state} />;
        }
    }
    return withDimension;
};
