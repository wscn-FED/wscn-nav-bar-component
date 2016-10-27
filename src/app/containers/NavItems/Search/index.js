import React from 'react';
import Icon from '#/components/Icon';
import './index.scss';

export default
class Search extends React.Component {
    static defaultProps = {
        className: 'nav-item-search'
    };

    state = {
        expanded: false
    };

    onButtonClick = e => {
        e.preventDefault();
        if (!this.state.expanded) {
            this.inputEl.focus();
        }
        this.toggleFE();
        if (this.props.onExpand) this.props.onExpand();
    };


    toggleFE = () => this.setState({
        expanded: !this.state.expanded
    });

    submit = e => {
        if (e) e.preventDefault();
        const value = e.target.querySelector('#navbar-search').value;
        window.open(`${this.props.api}${encodeURIComponent(value)}`);
    };

    bindRef = ref => {
        this.inputEl = ref;
    };

    render() {
        return (
            <div className={this.props.className}>
                <form onSubmit={this.submit} data-expanded={this.state.expanded}>
                    <input ref={this.bindRef} id="navbar-search" type="search" placeholder="搜索您想要的信息"/>
                    <span className="search-btn" onClick={this.onButtonClick}><Icon symbolId="search"/></span>
                </form>
            </div>
        );
    }
}
