import React from 'react';
import { parseTime } from '../../utils/time';
import './index.scss';

export default
class Time extends React.PureComponent {
    static defaultProps = {
        className: 'time'
    }
    render() {
        const { date, option} = this.props;
        return (
            <time className={this.props.className} dateTime={date.toISOString()}>{parseTime(date, option)}</time>
        );
    }
}
