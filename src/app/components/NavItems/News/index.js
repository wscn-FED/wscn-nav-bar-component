import React from 'react';
import c from '#/utils/c';
import withOpen from '../../../utils/withOpen';
import withData from '../../../utils/withData';
import Card from './Card';
import List from './List';
import Tabs, { TabPane } from '../../Tabs';
import './index.scss';


const America = withData({
    url: '/api/posts',
    params: {
        type: 'news',
        limit: 2,
        cid: 16
    },
    method: 'get'
}, res => res.data.results)(List);

const China = withData({
    url: '/api/posts',
    params: {
        type: 'news',
        limit: 2,
        cid: 17
    },
    method: 'get'
}, res => res.data.results)(List);

const Europe = withData({
    url: '/api/posts',
    params: {
        type: 'news',
        limit: 2,
        cid: 15
    },
    method: 'get'
}, res => res.data.results)(List);

class NewsTabs extends React.PureComponent {
    static defaultProps = {
        className: 'news-tabs'
    }

    render() {
        const defaultClassName = NewsTabs.defaultProps.className;
        return (
            <Tabs className={c(defaultClassName, this.props.className, this.props.open && 'show')} >
                <TabPane name="美国">
                    <America renderItem={Card}/>
                </TabPane>
                <TabPane name="中国">
                    <China renderItem={Card}/>
                </TabPane>
                <TabPane name="欧洲">
                    <Europe renderItem={Card}/>
                </TabPane>
            </Tabs>
        );
    }
}


@withOpen
export default
class News extends React.PureComponent {
    static defaultProps = {
        className: 'nav_item_news'
    }

    render() {
        return (
            <div className={c(this.props.className)} >
                <span>资讯</span>
                <NewsTabs open={this.props.open} />
            </div>
        );
    }
}

