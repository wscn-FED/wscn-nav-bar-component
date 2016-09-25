import React from 'react';
import { withPrefix } from '#/utils/c';
import { formatTime } from '#/utils/time';
import './index.scss';

export default
class Card extends React.PureComponent {
    static defaultProps = {
        prefix: 'news-card'
    }
    render() {
        const { prefix, className, imageUrl, title, user, createdAt, url} = this.props;
        const c = withPrefix(prefix, className);
        return (
            <li className={c()}>
                <img className={c('thumbnail')} src={imageUrl + '?imageView2/1/w/70/h/70'} alt="" />
                <div className={c('content-container')}>
                    <a href={url} target="_blank" rel="noopener noreferrer" >
                        <h1 className={c('title')}>{title}</h1>
                    </a>
                    <div className={c('footer')}>
                        <span className={c('author')}>文 / <a href={user.url}>{user.screenName || user.username}</a></span>
                        <span className={c('time')}>{formatTime(createdAt)}</span>
                    </div>
                </div>
            </li>
        );
    }
}
