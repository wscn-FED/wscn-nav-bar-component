import React from 'react';
import withData from '#/HOC/withData';
import Hoverable from '#/components/Hoverable';
import Tabs, { TabPane } from '#/components/Tabs';
import News from '#/containers/NavItems/News/List';
import Live from '#/containers/NavItems/Live/List';
import './index.scss';

const components = {
    News,
    Live
};

class WeexTab extends React.PureComponent {
    static defaultProps = {
        className: 'weex-tab'
    }

    ContentList = this.props.tabs.map(tab => {
        const Content = components[tab.component];
        return withData(tab.api, res => res.data.results, { fetchAfterMount: false })(Content);
    })

    render() {
        return (
            <Tabs className={this.props.className}>
                {this.ContentList.map((Content, index) => (
                    <TabPane name={this.props.tabs[index].name} key={this.props.tabs[index].name}>
                        <Content open={this.props.open} />
                    </TabPane>
                ))}
            </Tabs>
        );
    }
}

export default
class Weex extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-weex'
    }

    render() {
        return (
            <Hoverable className={this.props.className} name={this.props.name}>
                <WeexTab tabs={this.props.tabs} />
            </Hoverable>
        );
    }
}
