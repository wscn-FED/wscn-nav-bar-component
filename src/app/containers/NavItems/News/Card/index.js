import React from 'react';
import classname, { withPrefix } from '#/utils/classnames';
import { formatTime } from '#/utils/time';
import Icon from '#/components/Icon';
import './index.scss';

export default
class Card extends React.PureComponent {
    static defaultProps = {
        prefix: 'news-card'
    }
    render() {
        const { prefix, className, imageUrl, title, user, createdAt, url, id} = this.props;
        const c = withPrefix(prefix);
        return (
            <li className={classname(c(), className)}>
                <img className={c('thumbnail')} src={imageUrl + '?imageView2/1/w/70/h/70'} alt="" />
                <div className={c('content-container')}>
                    <a href={this.props.isWeex ? `//strategy.weex.in/weex/node/${id}` : url} target="_blank" rel="noopener noreferrer" >
                        <h1 className={c('title')}>{title}</h1>
                    </a>
                    <div className={c('footer')}>
                        <span className={c('author')}>文 / <a href={user.url} target="_blank" rel="noopener noreferrer" >{user.screenName || user.username}</a></span>
                        <div className={c('time')}><Icon symbolId="time" /><span>{formatTime(createdAt)}</span></div>
                    </div>
                </div>
            </li>
        );
    }
}
