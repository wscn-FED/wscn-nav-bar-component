import React from 'react';
import { parseTime } from '#/utils/time';
import classnames, { withPrefix } from '#/utils/classnames';
import './index.scss';

export default
class Time extends React.PureComponent {
    static defaultProps = {
        prefix: 'time'
    }
    render() {
        const { date, option} = this.props;
        return (
            <time className={classnames(this.props.className, withPrefix(this.props.prefix)())} dateTime={date.toISOString()}>{parseTime(date, option)}</time>
        );
    }
}
