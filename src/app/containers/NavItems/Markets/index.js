import React from 'react';
import withData from '#/HOC/withData';
import Loading from '#/components/Loading';
import Retry from '#/components/Retry';
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
        const [ name, last, change, changeRate, precision, type, indexName ] = this.props.data.snapshot;
        return (
            <a href={`//markets.wallstreetcn.com/${type}/${indexName}`} target="_blank" rel="noopener noreferrer">
                <div className={this.props.className} data-trend={change > 0 ? 'positive' : 'negative'}>
                    <div className="name">{name}</div>
                    <div className="value">{Number(last).toFixed(precision)}</div>
                    <div className="change">{change > 0 && '+'}{Number(change).toFixed(precision)}</div>
                    <div className="change-rate">{changeRate > 0 && '+'}{Number(changeRate).toFixed(precision)}%</div>
                    <Chart data={this.props.data.candle} />
                </div>
            </a>
        );
    }
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
        if (this.props.error) return <Retry className="markets-retry" onClick={this.props.fetchData} />;
        return (
            <ul className={this.props.className}>
                {this.props.data.map(datum => (
                    <Card data={datum} key={datum.snapshot[0]}/>
                ))}
            </ul>
        );
    }
}

function getURLs(indices, api) {
    return [
        `${api}/real?en_prod_code=${indices.join(',')}&fields=prod_name,last_px,px_change,px_change_rate,price_precision,securities_type`,
        `${api}/kline?prod_code=${indices.join(',')}&candle_period=5&data_count=80&end_time=0&fields=close_px`
    ];
}

class MarketsTab extends React.PureComponent {
    static defaultProps = {
        className: 'markets-tab'
    }

    ContentList = this.props.tabs.map(tab => withData(getURLs(tab.indices, tab.api), res => {
        if (res.some(item => item.data.code != 200)) throw (new Error('fetch failed'));
        return tab.indices.map(indexName => ({
            snapshot: res[0].data.data.snapshot[indexName].concat(indexName),
            candle: res[1].data.data.candle[indexName]
        }));
    }, {fetchAfterMount: false})(List));

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
