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
                <div className="time">{parseTime(this.props.createdAt, '{h}:{m}')}</div>
                <a href="//live.wallstreetcn.com" target="_blank" rel="noopener noreferrer"><div className="title">{this.props.title}</div></a>
            </li>
        );
    }
}
