/**
 * Created by fengyuanzemin on 16/9/28.
 */
import React from 'react';
import trimString from '#/utils/trimString.js';
import Icon from '#/components/Icon';
import './index.scss';

export default
class Card extends React.PureComponent {
    static defaultProps = {
        className: 'discussion-card'
    };
    Tag = this.props.data.tags.slice(0, 2).map(
        (v) => <span key={v.id} className="discussion-card-tags-item">{v.name}</span>
    );

    responseCount = this.props.data.responseCount === 0
        ? <p className="discussion-card-response"><Icon symbolId="dialogue" /><span className="discussion-card-grey">还没有回答, </span><span>分享点见识吧</span></p>
        : <p className="discussion-card-response"><Icon symbolId="dialogue" /><span>{this.props.data.responseCount}个回复</span></p>;

    render() {
        const {title, summary, iconUrl, url} = this.props.data;
        const sumString = trimString(summary, 68);
        const titString = trimString(title, 48);
        return (
            <a href={url} target="_blank" rel="noopener noreferrer">
                <div className={this.props.className}>
                    <p className="discussion-card-header">{titString}</p>
                    {this.responseCount}
                    <p className="discussion-card-content">{sumString}</p>
                    <div className="discussion-card-tags">{this.Tag}</div>
                    {iconUrl && <img src={iconUrl} alt="" className="discussion-card-icon"/>}
                </div>
            </a>
        );
    }
}
