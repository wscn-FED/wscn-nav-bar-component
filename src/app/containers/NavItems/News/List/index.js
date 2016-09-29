import React from 'react';
import c from '../../../../utils/classnames';
import './index.scss';

export default
class List extends React.PureComponent {
    static defaultProps = {
        className: 'news-list'
    }

    componentDidMount() {
        if (this.props.activated && !this.props.data) this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activated && !nextProps.data) this.props.fetchData();
    }

    render() {
        if (this.props.loading) return <div>加载中...</div>;
        if (this.props.error) return <div>加载失败</div>;
        const Item = this.props.renderItem;
        return (
            <ul className={c(this.props.className)}>
                {this.props.data.map((datum, index) => <Item key={this.props.getKey ? this.props.getKey(datum) : index} {...datum} />)}
            </ul>
        );
    }
}