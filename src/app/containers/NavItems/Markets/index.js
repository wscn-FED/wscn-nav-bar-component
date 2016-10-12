import React from 'react';
import withData from '#/HOC/withData';
import Hoverable from '#/components/Hoverable';
import Tabs, { TabPane } from '#/components/Tabs';
import './index.scss';

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
        if (this.props.loading) return <div>加载中...</div>;
        if (this.props.error) return <div>加载失败</div>;
        return <div>123</div>;
    }
}

class MarketsTab extends React.PureComponent {
    static defaultProps = {
        className: 'markets-tab'
    }

    ContentList = this.props.tabs.map(tab => withData(tab.api, res => res.map((item, index) => item.data.data[['snapshot', 'candle'][index]]), {fetchAfterMount: false})(List));

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
