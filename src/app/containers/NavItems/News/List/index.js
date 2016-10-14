import React from 'react';
import c from '#/utils/classnames';
import Loading from '#/components/Loading';
import Retry from '#/components/Retry';
import Card from '../Card';
import './index.scss';

export default
class List extends React.PureComponent {
    static defaultProps = {
        className: 'news-list',
        renderItem: Card
    }

    componentDidMount() {
        if (this.props.activated && !this.props.data) this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activated && !nextProps.data) this.props.fetchData();
    }

    render() {
        if (this.props.loading) return <Loading className="news-loading" />;
        if (this.props.error) return <Retry className="news-retry" onClick={this.props.fetchData} />;
        const Item = this.props.renderItem;
        return (
            <ul className={c(this.props.className)}>
                {this.props.data.map((datum, index) => <Item isWeex={this.props.isWeex} key={this.props.getKey ? this.props.getKey(datum) : index} {...datum} />)}
            </ul>
        );
    }
}
