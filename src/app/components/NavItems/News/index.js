import React from 'react';
import c from '../../../utils/c';
import withOpen from '../../../utils/withOpen';
import withData from '../../../utils/withData';
import Card from './Card';
import List from './List';
import Tabs, { TabPane } from '../../Tabs';
import './index.scss';

class NewsTab extends React.PureComponent {
    static defaultProps = {
        className: 'news-tab'
    }

    mapConfigToTabPane(tabs) {
        return tabs.map(tab => {
            const Content = withData(tab.api, res => res.data.results)(List);
            return (
                <TabPane name={tab.name} key={tab.name}>
                    <Content renderItem={Card}/>
                </TabPane>
            );
        });
    }

    render() {
        return (
            <div className={c(this.props.className)} data-open={this.props.open}>
                <Tabs>
                    {this.mapConfigToTabPane(this.props.tabs)}
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
