import React from 'react';
import c from 'classnames';
import NavItems from '../NavItems';

export default function NavMain(props) {
    return (
        <div className={c(props.className)} >
            {props.items.map(name => {
                const DynamicComponent = NavItems[name];
                return <DynamicComponent key={name} />;
            })}
        </div>
    );
}

NavMain.defaultProps = {
    className: 'nav-main'
};
