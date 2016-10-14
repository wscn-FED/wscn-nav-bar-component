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

    ContentList = this.props.tabs.map(tab => withData(tab.api, res => res.data.results, {fetchAfterMount: false})(List));

    render() {
        return (
            <Tabs className={this.props.className}>
                {
                    this.ContentList.map((Content, index) => (
                        <TabPane name={this.props.tabs[index].name} key={this.props.tabs[index].name}>
                            <Content renderItem={Card} open={this.props.open} />
                        </TabPane>
                    ))
                }
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
