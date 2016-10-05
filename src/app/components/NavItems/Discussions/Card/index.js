/**
 * Created by fengyuanzemin on 16/9/28.
 */
import React from 'react';
import c from '../../../../utils/c';
import './index.scss';

export default
class Card extends React.PureComponent {
    static defaultProps = {
        className: 'discussion-card'
    };

    render() {
        const {title, summary, tags} = this.props.data;
        const tag = tags.map((v) => <span key={v.id}>{v.name}</span>);
        return (
            <div className={c(this.props.className)}>
                <h4 className={c('header')}>{title}</h4>
                <p className={c('content')}>{summary}</p>
                <div className={c('tag')}>{tag}</div>
            </div>
        );
    }
}
