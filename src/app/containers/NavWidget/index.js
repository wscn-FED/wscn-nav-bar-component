import React from 'react';
import NavItems from '#/containers/NavItems';
import './index.scss';

const { Search, Profile } = NavItems;

export default
class Widget extends React.Component {
    static defaultProps = {
        className: 'nav-widget'
    };

    toggleFE = () => {
        if (this.SearchInstance.toggleFE) this.SearchInstance.toggleFE();
    };

    bindSearch = ref => {
        this.SearchInstance = ref;
    };

    render() {
        return (
            <div className={this.props.className}>
                <Search ref={this.bindSearch} onExpand={this.props.onExpand} {...this.props.items.find(item => item.name === 'Search')} />
                <Profile {...this.props.items.find(item => item.name === 'Notification')} />
            </div>
        );
    }
}
