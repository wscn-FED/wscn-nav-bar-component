import React from 'react';
import c from 'classnames';
import NavItems from '../NavItems';
import './index.scss';

export default
class NavMain extends React.PureComponent {
    static defaultProps = {
        className: 'nav-main'
    }

    mapConfigToItems(items) {
        return items.map(({name, tabs, component}) => {
            const DynamicComponent = NavItems[component];
            const el = React.createElement(DynamicComponent, {
                key: name,
                name,
                tabs
            });
            return el;
        });
    }

    render() {
        return (
            <div className={c(this.props.className)} >
                {this.mapConfigToItems(this.props.items)}
            </div>
        );
    }
}
