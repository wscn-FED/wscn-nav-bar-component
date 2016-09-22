import c from 'classnames';
import React from 'react';
import NavMain from '../NavMain';
import NavRest from '../NavRest';
import NavWidget from '../NavWidget';
import NavLogo from '../NavLogo';


export default
class NavBar extends React.PureComponent {
    static defaultProps = {
        className: 'header_nav'
    }
    render() {
        const { config } = this.props;
        return (
            <nav className={c(this.props.className)} >
                <NavLogo config={config.logo} />
                <NavMain items={config.main} />
                <NavRest items={config.rest} />
                <NavWidget items={config.widget} />
            </nav>
        );
    }
}
