import React from 'react';
import Foldable from '#/components/Foldable';
import NavItems from '#/containers/NavItems';
import './index.scss';


export default
class NavRest extends React.Component {
    static defaultProps = {
        className: 'nav-rest'
    }

    render() {
        return (
            <div className={this.props.className}>
                <Foldable className="content">
                    {this.props.items.map(item => {
                        const DynamicComponent = NavItems[item.component];
                        if (DynamicComponent) return <DynamicComponent {...item} key={item.name}/>;
                        return <div className="nav-item" key={item.name}>{item.name}</div>;
                    })}
                </Foldable>
            </div>
        );
    }
}
