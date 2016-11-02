import React from 'react';
import c from '#/utils/classnames';
import NavMain from '#/containers/NavMain';
import NavRest from '#/containers/NavRest';
import NavWidget from '#/containers/NavWidget';
import NavLogo from '#/containers/NavLogo';
import './index.scss';


export default
class NavBar extends React.PureComponent {
    static defaultProps = {
        className: 'header-nav'
    };
    bindNavRest = ref => {
        this.NavRestInstance = ref;
    };

    bindNavWidget = ref => {
        this.NavWidgetInstance = ref;
    };

    toggleNavWidget = () => {
        if (this.NavWidgetInstance.toggleFE) this.NavWidgetInstance.toggleFE();
    };

    toggleNavRest = () => {
        if (this.NavRestInstance.toggleFE) this.NavRestInstance.toggleFE();
    };

    render() {
        const {config} = this.props;
        return (
            <nav className={c(this.props.className)}>
                <NavLogo />
                <NavMain items={config.main}/>
                <span className="header-nav-rules">|</span>
                <NavRest ref={this.bindNavRest} items={config.rest} onExpand={this.toggleNavWidget}/>
                <NavWidget ref={this.bindNavWidget} items={config.widget} onExpand={this.toggleNavRest}/>
            </nav>
        );
    }
}
