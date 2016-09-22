import React from 'react';
import c from 'classnames';
import NavItems from '../NavItems';

export default
class NavMain extends React.PureComponent {
    static defaultProps = {
        className: 'nav_main'
    }

    render() {
        return (
            <div className={c(this.props.className)} >
                {this.props.items.map(name => {
                    const DynamicComponent = NavItems[name];
                    return <DynamicComponent key={name} />;
                })}
            </div>
        );
    }
}
