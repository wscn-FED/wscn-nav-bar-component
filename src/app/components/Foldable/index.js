import React from 'react';
import { Motion, spring } from 'react-motion';
import classname, { withPrefix } from '#/utils/classnames';
import Icon from '#/components/Icon';
import './index.scss';

export default
class Foldable extends React.Component {
    static defaultProps = {
        prefix: 'foldable'
    }

    state = {
        fold: false
    }

    fold = () => this.setState({fold: true})

    unfold = () => this.setState({fold: false})

    toggle = () => this.setState({fold: !this.state.fold})

    render() {
        const style = {
            indicator: {
                opacity: spring(Number(this.state.fold)),
                x: spring(Number(!this.state.fold) * 10)
            },
            content: {
                opacity: spring(Number(!this.state.fold))
            }
        };
        const p = withPrefix(this.props.prefix);
        return (
            <div className={classname(p(), this.props.className)}>
                <Motion style={style.indicator}>
                    {({x, opacity}) => (
                        <div
                            onClick={this.unfold}
                            className={p('indicator')}
                            style={{
                                transform: `translate(${x * 100}%)`,
                                opacity,
                                visibility: this.state.fold ? 'visible' : 'hidden'
                            }}
                        >
                            <Icon symbolId="dots" />
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
            </div>
        );
    }
}
