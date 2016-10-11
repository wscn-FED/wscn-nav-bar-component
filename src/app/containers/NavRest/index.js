import React from 'react';
import Foldable from '#/components/Foldable';
import NavItems from '#/containers/NavItems';
import './index.scss';

const { Weex } = NavItems;

export default
class NavRest extends React.Component {
    static defaultProps = {
        className: 'nav-rest'
    }

    render() {
        return (
            <div className={this.props.className}>
                <Foldable className="content">
                    <Weex {...this.props.items[0]}/>
                </Foldable>
            </div>
        );
    }
}
