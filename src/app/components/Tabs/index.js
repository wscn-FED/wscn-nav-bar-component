import React from 'react';
import c from 'classnames';

export default
class Tabs extends React.Component {
    static defaultProps = {
        className: 'tabs',
        navClassName: 'tabs_nav',
        navContainerClassName: 'tabs_nav_container',
        navIndicatorClassName: 'tabs_nav_indicator',
        contentContainerClassName: 'tabs_content_container',
        tabNameClassName: 'tab_name'
    }
    state = {
        index: 0
    }

    onTabClicked = index => () => this.setState({index})

    mapChildToNavItem = (child, index) => <div className={this.props.tabNameClassName} onClick={this.onTabClicked(index)} data-active={index === this.state.index}>{child.props.name}</div>

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
        className: 'tab_pane'
    }
    render() {
        return (
            <div className={c(this.props.className)} data-active={this.props.activated}>
                {this.props.children}
            </div>
        );
    }
}
