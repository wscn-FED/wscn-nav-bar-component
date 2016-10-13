import React from 'react';
import c from '#/utils/classnames';
import Clock from '../Clock';
import Card from '../Card';
import './index.scss';

export default
class List extends React.PureComponent {
    static defaultProps = {
        className: 'live-list',
        renderItem: Card
    }

    componentDidMount() {
        if (this.props.activated && this.props.open) this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activated && nextProps.open) this.props.fetchData();
    }

    renderContent() {
        if (this.props.loading) return <div>加载中...</div>;
        if (this.props.error) return <div>加载失败</div>;
        const Item = this.props.renderItem;
        return (
            <ul>
                {this.props.data.map((datum, index) => <Item isWeex={this.props.isWeex} key={this.props.getKey ? this.props.getKey(datum) : index} {...datum} />)}
            </ul>
        );
    }

    render() {
        return (
            <div className={c(this.props.className)}>
                <Clock />
                {this.renderContent()}
            </div>
        );
    }
}
