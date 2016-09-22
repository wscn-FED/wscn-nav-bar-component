import React from 'react';
import withHover from '../../../utils/withHover';
import withData from '../../../utils/withData';

@withHover
export default
class News extends React.PureComponent {
    render() {
        console.log(this.props);
        return (
            <div>
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


@withData({
        url: '/api/posts',
        params: {
            type: 'news',
            limit: 3
        },
        method: 'get'
    },
    res => res.data
)
class NewsTab extends React.PureComponent {
    render() {
        if (this.props.loading) return <span>'加载中...'</span>;
        if (this.props.error) return <span>'出错了'</span>;
        return (
            <div>
                this.props.results
            </div>
        );
    }
}
