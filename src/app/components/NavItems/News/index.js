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

class NewsTab extends React.PureComponent {
    static defaultProps = {
        className: 'news-tab'
    }

    render() {
        return (
            <div className={c(this.props.className)} data-open={this.props.open}>
                <Tabs>
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
                <span>资讯</span>
                <NewsTab open={this.props.open} />
            </div>
        );
    }
}

