import React from 'react';
import Foldable from '#/components/Foldable';
import NavItems from '#/containers/NavItems';
import './index.scss';


export default
class NavRest extends React.Component {
    static defaultProps = {
        className: 'nav-rest'
    };

    toggleFE = (status) => {
        if (this.FoldableInstance.toggleFE) this.FoldableInstance.toggleFE(status);
    };

    bindFoldable = ref => {
        this.FoldableInstance = ref;
    };

    render() {
        return (
            <div className={this.props.className + ' zIndex2'}>
                <Foldable ref={this.bindFoldable} onExpand={this.props.onExpand} className="content" foldableWidth="1430">
                    {this.props.items.map(item => {
                        const DynamicComponent = NavItems[item.component];
                        if (DynamicComponent) return <DynamicComponent {...item} key={item.name}/>;
                        const attrs = {
                            key: 'rest' + item.name
                        };
                        if (item.tag) {
                            attrs['data-tag'] = item.tag;
                        }
                        return <a {...attrs} href={item.href} target="_blank" rel="noopener noreferrer"><div className="nav-item" >{item.name}</div></a>;
                    })}
                </Foldable>
            </div>
        );
    }
}
