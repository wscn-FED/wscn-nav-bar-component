import React from 'react';
import withOpen from '../../../utils/withOpen';
import withData from '../../../utils/withData';
import c from '../../../utils/c';
import Tabs, { TabPane } from '../../Tabs';
import List from './List';
import Card from './Card';
import './index.scss';


class LiveTab extends React.PureComponent {
    static defaultProps = {
        className: 'live-tab'
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
class Live extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-live'
    }

    render() {
        return (
            <div className={c(this.props.className)}>
                <span>{this.props.name}</span>
                <LiveTab open={this.props.open} tabs={this.props.tabs} />
            </div>
        );
    }
}
