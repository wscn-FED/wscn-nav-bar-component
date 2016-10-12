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
    }

    bindNavRest = ref => {
        this.NavRestInstance = ref;
    }

    bindNavWidget = ref => {
        this.NavWidgetInstance = ref;
    }

    foldNavWidget = () => {
        if (this.NavWidgetInstance.fold) this.NavWidgetInstance.fold();
    }

    foldNavRest = () => {
        if (this.NavRestInstance.fold) this.NavRestInstance.fold();
    }

    render() {
        const { config } = this.props;
        return (
            <nav className={c(this.props.className)} >
                <NavLogo />
                <NavMain items={config.main} />
                |
                <NavRest ref={this.bindNavRest} items={config.rest} onExpand={this.foldNavWidget} />
                <NavWidget ref={this.bindNavWidget} items={config.widget} onExpand={this.foldNavRest} />
            </nav>
        );
    }
}
