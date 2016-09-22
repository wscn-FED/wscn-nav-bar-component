import React from 'react';
import c from 'classnames';

export default
class Tabs extends React.Component {
    static defaultProps = {
        className: 'tabs',
        navClassName: 'tabs-nav',
        navContainerClassName: 'tabs-nav-container',
        navIndicatorClassName: 'tabs-nav-indicator',
        contentContainerClassName: 'tabs-content-container'
    }
    state = {
        index: 0
    }

    onTabClicked = index => () => this.setState({index})

    mapChildToNavItem = (child, index) => <div onClick={this.onTabClicked(index)} data-active={index === this.state.index}>{child.props.name}</div>

    mapChildToNavContent = (child, index) => React.cloneElement(child, {
        activated: index === this.state.index
    })

    render() {
        const Children = this.props.children;
        const { className, navClassName, navContainerClassName, navIndicatorClassName, contentContainerClassName } = this.props;

        return (
            <div className={c(className)} >
                <div className={c(navContainerClassName)} >
                    <div className={c(navClassName)} >
                        {React.Children.map(Children, this.mapChildToNavItem)}
                    </div>
                    <div className={c(navIndicatorClassName)} />
                </div>
                <div className={c(contentContainerClassName)} >
                    {React.Children.map(Children, this.mapChildToNavContent)}
                </div>
            </div>
        );
    }
}


export
class TabPane extends React.PureComponent {
    static defaultProps = {
        className: 'tab-pane'
    }
    render() {
        return (
            <div className={c(this.props.className)} data-active={this.props.activated}>
                {this.props.children}
            </div>
        );
    }
}
