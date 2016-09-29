import React from 'react';
import withOpen from '../../../utils/withOpen';
import withData from '../../../utils/withData';
import c from '../../../utils/c';
import { parseTime } from '../../../utils/time';
import Time from '../../Time';
import CountDown from '../../CountDown';


class CalendarTab extends React.PureComponent {
    static defaultProps = {
        className: 'calendar-tab'
    }

    render() {
        if (this.props.loading) return <div>加载中...</div>;
        if (this.props.error) return <div>加载失败...</div>;
        const to = this.props.data.reduce((prev, cur) => {
            if (cur.timestamp < Date.now()) return prev;
            if (cur.timestamp < prev.timestamp) return cur;
            return prev;
        }).timestamp * 1000;
        return (
            <div className={c(this.props.className)} data-open={this.props.open}>
                <div><Time date={new Date()} option="{y}-{m}-{d} 星期{a}" /> 据下次数据公布时间还有：<CountDown to={to}/></div>
                <ul>
                    {this.props.data.map(item => (
                        <li key={item.id}>
                            <div>{parseTime(item.timestamp * 1000, '{h}:{m}')}</div>
                            <div>
                                <div className="stars">{new Array(item.importance).fill().map(() => '❤️').join('')}{item.calendarType === 'FE' && '事件'}</div>
                                <div><span>{item.country}</span>|{item.title}</div>
                                <div data-show={item.calendarType === 'FD'}>
                                    <div>前值：<span>{item.previous || '- -'}</span></div>
                                    <div>预测：<span>{item.forecast || '- -'}</span></div>
                                    <div>今值：<span>{item.actual || '- -'}</span></div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}


@withOpen
export default
class Calendar extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-calendar'
    }

    now = Math.floor(Date.now() / 1000)

    CalendarTab = withData({
        url: this.props.api,
        params: {
            start: this.now,
            end: this.now + 7 * 24 * 3600,
            limit: 3,
            importance: 3
        }
    }, res => res.data.results)(CalendarTab)

    render() {
        const Tab = this.CalendarTab;
        return (
            <div className={c(this.props.className)}>
                <span>{this.props.name}</span>
                <Tab open={this.props.open} />
            </div>
        );
    }
}
