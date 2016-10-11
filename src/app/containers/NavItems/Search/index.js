import React from 'react';
import Icon from '#/components/Icon';
import './index.scss';

export default
class Search extends React.Component {
    static defaultProps = {
        className: 'nav-item-search'
    }

    state = {
        expanded: false
    }

    onButtonClick = e => {
        e.preventDefault();
        if (!this.state.expanded) {
            this.expand();
            this.inputEl.focus();
        } else this.submit();
    }

    expand = () => this.setState({
        expanded: true
    })

    submit = e => {
        if (e) e.preventDefault();
        location.href = '//www.wallstreetcn.com';
    }

    bindRef = ref => {
        this.inputEl = ref;
    }

    render() {
        return (
            <div className={this.props.className}>
                <form onSubmit={e => e.preventDefault()} data-expanded={this.state.expanded} >
                    <input ref={this.bindRef} id="search" type="search" placeholder="搜索您想要的信息" />
                    <button type="submit" onClick={this.onButtonClick}><Icon symbolId="search" /></button>
                </form>
            </div>
        );
    }
}
