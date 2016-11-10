import React from 'react';
import c from '#/utils/classnames';
import { parseTime } from '#/utils/time';
import './index.scss';

export default
class Card extends React.PureComponent {
    static defaultProps = {
        className: 'live-card'
    }

    render() {
        return (
            <li className={c(this.props.className)}>
                <div className="live-card-time">{parseTime(this.props.createdAt, '{h}:{m}')}</div>
                <a href={this.props.isWeex ? '//strategy.weex.in/?from=wscnpc_narbar_livetab' : '//live.wallstreetcn.com'} target="_blank" rel="noopener noreferrer"><div className="live-card-title">{this.props.title}</div></a>
            </li>
        );
    }
}
