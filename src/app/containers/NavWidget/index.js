import React from 'react';
import NavItems from '#/containers/NavItems';
import './index.scss';

const { Search, Profile } = NavItems;

export default
class Widget extends React.Component {
    static defaultProps = {
        className: 'nav-widget'
    }

    fold = () => {
        if (this.SearchInstance.fold) this.SearchInstance.fold();
    }

    bindSearch = ref => {
        this.SearchInstance = ref;
    }

    render() {
        return (
            <div className={this.props.className}>
                <Search ref={this.bindSearch} onExpand={this.props.onExpand} />
                <Profile />
            </div>
        );
    }
}
