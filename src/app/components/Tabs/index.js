import React from 'react';
import { Motion, spring } from 'react-motion';
import classname, { withPrefix } from '#/utils/c';
import './index.scss';

export default
class Tabs extends React.Component {
    static defaultProps = {
        prefix: 'tabs'
    }
    state = {
        index: 0
    }

    onTabClicked = index => () => this.setState({index})

    c = withPrefix(this.props.prefix)

    mapChildToNavItem = (child, index) => <div className={this.c('nav-item')} onClick={this.onTabClicked(index)} data-active={index === this.state.index}>{child.props.name}</div>

    mapChildToNavContent = (child, index) => React.cloneElement(child, {
        activated: index === this.state.index
    })

    render() {
        const Children = this.props.children;
        const c = this.c;
        return (
            <div className={classname(c(), this.props.className)} >
                <div className={c('nav-container')} >
                    <div className={c('nav')} >
                        {React.Children.map(Children, this.mapChildToNavItem)}
                        <Motion style={{
                            x: spring(this.state.index)
                        }}>
                            {({x}) => <div style={{width: `${100 / this.props.children.length}%`, transform: `translate(${x * 100}%)`}} className={c('nav-indicator')} />}
                        </Motion>
                    </div>
                </div>
                <div className={c('content')} >
                    {this.mapChildToNavContent(Children[this.state.index], this.state.index)}
                </div>
            </div>
        );
    }
}


export
class TabPane extends React.PureComponent {
    static defaultProps = {
        prefix: 'tab-pane'
    }
    render() {
        return (
            <div className={withPrefix(this.props.prefix)()} data-active={this.props.activated}>
                {this.props.children}
            </div>
        );
    }
}
