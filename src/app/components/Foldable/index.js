import React from 'react';
import {Motion, spring, presets} from 'react-motion';
import classname, {withPrefix} from '#/utils/classnames';
import Icon from '#/components/Icon';
import './index.scss';

export default
class Foldable extends React.Component {
    static defaultProps = {
        prefix: 'foldable',
        foldableMaxWidth: 1430,
        foldableMinWidth: 1200
    };

    state = {
        fold: false,
        hide: window.innerWidth <= 1200
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize = () => {
        if (window.innerWidth <= this.props.foldableMinWidth) {
            this.setState({hide: true});
        } else {
            this.setState({hide: false});
        }
        if (window.innerWidth >= this.props.foldableMaxWidth) {
            this.setState({fold: false});
        }
    };

    toggleFE = () => {
        if (window.innerWidth >= this.props.foldableMaxWidth) return;
        this.setState({fold: !this.state.fold});
        if (window.innerWidth <= this.props.foldableMinWidth) return;
        if (this.props.onExpand) this.props.onExpand();
    };

    render() {
        const style = {
            indicator: {
                opacity: spring(Number(this.state.fold), {...presets.stiff}),
                x: spring(Number(!this.state.fold) * 10, {...presets.stiff})
            },
            content: {
                opacity: spring(Number(!this.state.fold), {...presets.stiff})
            }
        };
        const p = withPrefix(this.props.prefix);
        const f = (
            <div className={classname(p(), this.props.className)}>
                <Motion style={style.indicator}>
                    {({x, opacity}) => (
                        <div
                            onClick={this.toggleFE}
                            className={p('indicator')}
                            style={{
                                transform: `translate(${x * 100}%)`,
                                opacity,
                                visibility: this.state.fold ? 'visible' : 'hidden'
                            }}
                        >
                            <Icon symbolId="dots"/>
                        </div>
                    )}
                </Motion>
                <Motion style={style.content}>
                    {({opacity}) => (
                        <div
                            className={p('content')}
                            style={{
                                opacity,
                                visibility: !this.state.fold ? 'visible' : 'hidden'
                            }}
                        >
                            {this.props.children}
                        </div>
                    )}
                </Motion>
            </div>);
        return (
            this.state.hide ? null : f
        );
    }
}
