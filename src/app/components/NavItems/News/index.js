import React from 'react';
import c from 'classnames';
import withHover from '../../../utils/withHover';
import withData from '../../../utils/withData';
import { formatTime } from '../../../utils/time';
import Tabs, { TabPane } from '../../Tabs';


class ListView extends React.PureComponent {
    static defaultProps = {
        className: 'list_view'
    }
    render() {
        if (this.props.loading) return <div>加载中...</div>;
        if (this.props.error) return <div>加载失败</div>;
        const Item = this.props.renderItem;
        return (
            <ul className={c(this.props.className)}>
                {this.props.data.map((datum, index) => <Item key={this.props.getKey ? this.props.getKey(datum) : index} {...datum} />)}
            </ul>
        );
    }
}


class Card extends React.PureComponent {
    static defaultProps = {
        className: 'card',
        contentContainerClassName: 'content_container',
        footerClassName: 'footer'
    }
    render() {
        const { contentContainerClassName, className, footerClassName, imageUrl, title, user, createdAt, url} = this.props;
        return (
            <li className={c(className)}>
                <img src={imageUrl + '?imageView2/1/w/70/h/70'} alt="" />
                <div className={contentContainerClassName}>
                    <a href={url} target="_blank" rel="noopener noreferrer" ><h1>{title}</h1></a>
                    <div className={c(footerClassName)}>
                        <span>文 / <a href={user.url}>{user.username}</a></span>
                        <span>{formatTime(createdAt)}</span>
                    </div>
                </div>
            </li>
        );
    }
}


const America = withData({
    url: '/api/posts',
    params: {
        type: 'news',
        limit: 2,
        cid: 16
    },
    method: 'get'
}, res => res.data.results)(ListView);

const China = withData({
    url: '/api/posts',
    params: {
        type: 'news',
        limit: 2,
        cid: 17
    },
    method: 'get'
}, res => res.data.results)(ListView);

const Europe = withData({
    url: '/api/posts',
    params: {
        type: 'news',
        limit: 2,
        cid: 15
    },
    method: 'get'
}, res => res.data.results)(ListView);

class NewsTab extends React.PureComponent {
    static defaultProps = {
        className: 'nav_tab'
    }

    render() {
        return (
            <Tabs className={c(this.props.className)}>
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

@withHover
export default
class News extends React.PureComponent {
    static defaultProps = {
        className: 'nav_item_news'
    }

    render() {
        return (
            <div className={c(this.props.className)} >
                <span>资讯</span>
                {
                    this.props.hovered
                    ? <NewsTab />
                    : null
                }
            </div>
        );
    }
}

