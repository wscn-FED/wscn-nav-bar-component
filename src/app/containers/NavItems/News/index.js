import React from 'react';
import c from '../../../utils/classnames';
import withOpen from '../../../utils/withOpen';
import withData from '../../../utils/withData';
import Card from './Card';
import List from './List';
import Tabs, { TabPane } from '../../../components/Tabs';
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
            <div className={c(this.props.className)} data-open={this.props.open}>
                <Tabs>
                    {this.TabPanes}
                </Tabs>
            </div>

        );
    }
}


@withOpen
export default
class News extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-news'
    }

    render() {
        return (
            <div className={c(this.props.className)} >
                <span>{this.props.name}</span>
                <NewsTab open={this.props.open} tabs={this.props.tabs} />
            </div>
        );
    }
}
