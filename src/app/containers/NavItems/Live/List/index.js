import React from 'react';
import c from '#/utils/classnames';
import Loading from '#/components/Loading';
import Retry from '#/components/Retry';
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
        if (this.props.loading) return <Loading className="live-loading"/>;
        if (this.props.error) return <Retry className="live-retry" onClick={this.props.fetchData} />;
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
