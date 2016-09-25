import React from 'react';
import {withPrefix } from '#/utils/c';
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

    c = withPrefix(this.props.prefix, this.props.className)

    mapChildToNavItem = (child, index) => <div className={this.c('nav-item')} onClick={this.onTabClicked(index)} data-active={index === this.state.index}>{child.props.name}</div>

    mapChildToNavContent = (child, index) => React.cloneElement(child, {
        activated: index === this.state.index
    })

    render() {
        const Children = this.props.children;
        const c = this.c;
        return (
            <div className={c()} >
                <div className={c('nav-container')} >
                    <div className={c('nav')} >
                        {React.Children.map(Children, this.mapChildToNavItem)}
                    </div>
                    <div className={c('nav-indicator')} />
                </div>
                <div className={c('content')} >
                    {React.Children.map(Children, this.mapChildToNavContent)}
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
