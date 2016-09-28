/**
 * Created by fengyuanzemin on 16/9/28.
 */
import React from 'react';
import withOpen from '../../../utils/withOpen';
import withData from '../../../utils/withData';
import c from '../../../utils/c';
import Tabs, { TabPane } from '../../Tabs';
import Card from './Card';
import './index.scss';


class DiscussionsTab extends React.PureComponent {
    static defaultProps = {
        className: 'discussions-tab'
    };

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
class Discussions extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-discussions'
    };

    render() {
        return (
            <div className={c(this.props.className)}>
                <span>{this.props.name}</span>
                <DiscussionsTab open={this.props.open} tabs={this.props.tabs} />
            </div>
        );
    }
}