import React from 'react';
import withData from '#/HOC/withData';
import Hoverable from '#/components/Hoverable';
import Tabs, { TabPane } from '#/components/Tabs';
import List from './List';
import Card from './Card';
import './index.scss';


class LiveTab extends React.PureComponent {
    static defaultProps = {
        className: 'live-tab'
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
class Live extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-live'
    }

    render() {
        return (
            <Hoverable className={this.props.className} name={this.props.name} href={this.props.href} >
                <LiveTab tabs={this.props.tabs} />
            </Hoverable>
        );
    }
}
