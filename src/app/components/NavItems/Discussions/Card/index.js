/**
 * Created by fengyuanzemin on 16/9/28.
 */
import React from 'react';
import './index.scss';
import trimString from '../../../../utils/trimString.js';

export default
class Card extends React.PureComponent {
    static defaultProps = {
        className: 'discussion-card'
    };
    Tag = this.props.data.tags.slice(0, 2).map(
        (v) => <span key={v.id} className="discussion-card-tags-item">{v.name}</span>
    );

    responseCount = this.props.data.responseCount === 0
        ? <p className="discussion-card-response"><span className="discussion-card-grey">还没有回答,  </span><span>分享点见识吧</span></p>
        : <p className="discussion-card-response"><span>{this.props.data.responseCount}个回复</span></p>;

    render() {
        const {title, summary, iconUrl, url} = this.props.data;
        const sumString = trimString(summary, 72);
        const titString = trimString(title, 48);
        return (
            <a className={this.props.className} href={url}>
                <h4 className="discussion-card-header">{titString}</h4>
                {this.responseCount}
                <p className="discussion-card-content">{sumString}</p>
                <div className="discussion-card-tags">{this.Tag}</div>
                <img src={iconUrl} alt="" className="discussion-card-icon"/>
            </a>
        );
    }
}

