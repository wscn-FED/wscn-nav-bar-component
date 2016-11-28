import React from 'react';
import c from 'classnames';
import NavItems from '#/containers/NavItems';
import './index.scss';

export default
class NavMain extends React.PureComponent {
    static defaultProps = {
        className: 'nav-main'
    }

    mapConfigToItems(items) {
        return items.map(config => {
            const {name, component} = config;
            const DynamicComponent = NavItems[component];
            if (DynamicComponent) {
                const el = React.createElement(DynamicComponent, {
                    key: name,
                    ...config
                });
                return el;
            }
            return <a className="nav-item-wrapper" href={config.href} key={name} target="_blank" rel="noopener noreferrer"><div className="nav-item">{name}</div></a>;
        });
    }

    render() {
        return (
            <div className={c(this.props.className)}>
                {this.mapConfigToItems(this.props.items)}
            </div>
        );
    }
}
