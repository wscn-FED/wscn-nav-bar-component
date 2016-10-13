import React from 'react';
import withData from '#/HOC/withData';
import Loading from '#/components/Loading';
import Hoverable from '#/components/Hoverable';
import Tabs, { TabPane } from '#/components/Tabs';
import './index.scss';

const WIDTH = 126;
const HEIGHT = 20;

class Chart extends React.PureComponent {
    static defaultProps = {
        className: 'chart'
    }

    getPoints() {
        const values = this.props.data.map(([val]) => val);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;
        return values.map((value, index) => {
            const x = index / values.length * WIDTH;
            if (range === 0) return `${x},${HEIGHT / 2}`;
            const y = (max - value) / range * HEIGHT;
            return `${x}, ${y}`;
        });
    }

    render() {
        return (
            <svg className={this.props.className} viewBox={`-1 -1 ${WIDTH + 2} ${HEIGHT + 2}`}>
                <polyline
                    className="path"
                    fill="none"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    points={this.getPoints()}/>
            </svg>
        );
    }
}

class Card extends React.PureComponent {
    static defaultProps = {
        className: 'markets-card'
    }

    render() {
        const [ name, last, change, changeRate, precision ] = this.props.data[0];
        return (
            <div className={this.props.className} data-trend={change > 0 ? 'positive' : 'negative'}>
                <div className="name">{name}</div>
                <div className="value">{Number(last).toFixed(precision)}</div>
                <div className="change">{change > 0 && '+'}{Number(change).toFixed(precision)}</div>
                <div className="change-rate">{changeRate > 0 && '+'}{Number(changeRate).toFixed(precision)}%</div>
                <Chart data={this.props.data[1]} />
            </div>
        );
    }
}

function objToArr(obj) {
    const { fields, ...rest } = obj; //eslint-disable-line
    return Object.keys(rest).map(key => obj[key]);
}

class List extends React.PureComponent {
    static defaultProps = {
        className: 'markets-list'
    }

    componentDidMount() {
        if (this.props.activated && this.props.open) this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activated && nextProps.open) this.props.fetchData();
    }

    render() {
        if (this.props.loading) return <Loading className="markets-loading" />;
        if (this.props.error) return <div>加载失败</div>;
        let data = this.props.data.map(datum => objToArr(datum));
        data = data[0].map((x, i) => data.map(d => d[i]));
        return (
            <ul className={this.props.className}>
                {data.map(datum => (
                    <Card data={datum} key={datum[0][0]}/>
                ))}
            </ul>
        );
    }
}

class MarketsTab extends React.PureComponent {
    static defaultProps = {
        className: 'markets-tab'
    }

    ContentList = this.props.tabs.map(tab => withData(tab.api, res => res.map((item, index) => {
        if (item.data.code != 200) throw (new Error('fetch failed'));
        return item.data.data[['snapshot', 'candle'][index]];
    }), {fetchAfterMount: false})(List));

    render() {
        return (
            <Tabs className={this.props.className}>
                {
                    this.ContentList.map((Content, index) => (
                        <TabPane name={this.props.tabs[index].name} key={this.props.tabs[index].name}>
                            <Content open={this.props.open} />
                        </TabPane>
                    ))
                }
            </Tabs>
        );
    }
}

export default
class Markets extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-markets'
    }
    render() {
        return (
            <Hoverable className={this.props.className} name={this.props.name} >
                <MarketsTab tabs={this.props.tabs} />
            </Hoverable>
        );
    }
}
