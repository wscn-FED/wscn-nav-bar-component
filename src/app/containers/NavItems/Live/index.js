import React from 'react';
import withOpen from '../../../utils/withOpen';
import withData from '../../../utils/withData';
import c from '../../../utils/classnames';
import Tabs, { TabPane } from '../../../components/Tabs';
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
            <div className={c(this.props.className)} data-open={this.props.open}>
                <Tabs>
                    {
                        this.ContentList.map((Content, index) => (
                            <TabPane name={this.props.tabs[index].name} key={this.props.tabs[index].name}>
                                <Content renderItem={Card} open={this.props.open} />
                            </TabPane>
                        ))
                    }
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
