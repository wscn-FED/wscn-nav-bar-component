import React from 'react';
import NavItems from '#/containers/NavItems';
import './index.scss';

const { Search } = NavItems;

export default
class Widget extends React.Component {
    static defaultProps = {
        className: 'nav-widget'
    }

    render() {
        return (
            <div className={this.props.className}>
                <Search />
                <div>profile</div>
            </div>
        );
    }
}
