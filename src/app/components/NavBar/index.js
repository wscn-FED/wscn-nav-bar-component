import React from 'react';
import NavMain from '../NavMain';
import NavRest from '../NavRest';
import NavWidget from '../NavWidget';
import NavLogo from '../NavLogo';


export default
function NavBar({config}) {
    return (
        <nav>
            <NavLogo config={config.logo} />
            <NavMain items={config.main} />
            <NavRest items={config.rest} />
            <NavWidget items={config.widget} />
        </nav>
    );
}
