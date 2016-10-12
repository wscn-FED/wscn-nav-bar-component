import React from 'react';
import Foldable from '#/components/Foldable';
import NavItems from '#/containers/NavItems';
import './index.scss';


export default
class NavRest extends React.Component {
    static defaultProps = {
        className: 'nav-rest'
    }

    fold = () => {
        if (this.FoldableInstance.fold) this.FoldableInstance.fold();
    }

    bindFoldable = ref => {
        this.FoldableInstance = ref;
    }

    render() {
        return (
            <div className={this.props.className}>
                <Foldable ref={this.bindFoldable} onExpand={this.props.onExpand} className="content">
                    {this.props.items.map(item => {
                        const DynamicComponent = NavItems[item.component];
                        if (DynamicComponent) return <DynamicComponent {...item} key={item.name}/>;
                        return <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"><div className="nav-item" >{item.name}</div></a>;
                    })}
                </Foldable>
            </div>
        );
    }
}
