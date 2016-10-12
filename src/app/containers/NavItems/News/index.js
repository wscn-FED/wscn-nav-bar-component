import React from 'react';
import withData from '#/HOC/withData';
import Hoverable from '#/components/Hoverable';
import Tabs, { TabPane } from '#/components/Tabs';
import Card from './Card';
import List from './List';
import './index.scss';

class NewsTab extends React.PureComponent {
    static defaultProps = {
        className: 'news-tab'
    }

    TabPanes = this.props.tabs.map(tab => {
        const Content = withData(tab.api, res => res.data.results, {fetchAfterMount: false})(List);
        return (
            <TabPane name={tab.name} key={tab.name}>
                <Content renderItem={Card} />
            </TabPane>
        );
    })

    render() {
        return (
            <Tabs className={this.props.className}>
                {this.TabPanes}
            </Tabs>
        );
    }
}


export default
class News extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-news'
    }

    render() {
        return (
            <Hoverable className={this.props.className} name={this.props.name}>
                <NewsTab tabs={this.props.tabs} />
            </Hoverable>
        );
    }
}
