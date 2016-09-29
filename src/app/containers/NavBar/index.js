import React from 'react';
import c from '../../utils/classnames';
import NavMain from '../NavMain';
import NavRest from '../NavRest';
import NavWidget from '../NavWidget';
import NavLogo from '../NavLogo';
import './index.scss';


export default
class NavBar extends React.PureComponent {
    static defaultProps = {
        className: 'header-nav'
    }
    render() {
        const { config } = this.props;
        return (
            <nav className={c(this.props.className)} >
                <NavLogo />
                <NavMain items={config.main} />
                <NavRest items={config.rest} />
                <NavWidget items={config.widget} />
            </nav>
        );
    }
}
