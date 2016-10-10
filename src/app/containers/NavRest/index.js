import React from 'react';
import Foldable from '#/components/Foldable';
import Hoverable from '#/components/Hoverable';
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
                    {this.props.items.map(item => <Hoverable key={item.name} name={item.name}><div>{item.name}</div></Hoverable>)}
                </Foldable>
            </div>
        );
    }
}
