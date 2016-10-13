import React from 'react';
import withData from '#/HOC/withData';
import classnames, { withPrefix } from '#/utils/classnames';
import { parseTime } from '#/utils/time';
import Loading from '#/components/Loading';
import Hoverable from '#/components/Hoverable';
import Time from '#/components/Time';
import CountDown from '#/components/CountDown';
import Icon from '#/components/Icon';
import './index.scss';


class CalendarTab extends React.PureComponent {
    static defaultProps = {
        prefix: 'calendar-tab'
    }

    render() {
        const p = withPrefix(this.props.prefix);
        if (this.props.loading) return <Loading className="calendar-loading" />;
        if (this.props.error) return <div className={classnames(this.props.className, p())} data-open={this.props.open}>加载失败...</div>;
        const to = this.props.data.reduce((prev, cur) => {
            if (new Date(cur.localDateTime) < new Date()) return prev;
            if (new Date(cur.localDateTime) < new Date(prev.localDateTime)) return cur;
            return prev;
        }).localDateTime;
        return (
            <div className={classnames(this.props.className, p())}>
                <div className={p('header')}>
                    <Icon symbolId="time" />
                    <Time date={new Date()} option="{y}-{m}-{d} 星期{a}" />
                    <div className={p('count-down-container')}>
                        据下次数据公布时间还有：<CountDown className="count-down" to={to}/>
                    </div>
                </div>
                <ul className={p('list')}>
                    {this.props.data.map(item => {
                        let trend;
                        const val = parseFloat(item.actual);
                        if (isNaN(val) || val === 0) trend = 'neutral';
                        else if (val > 0) trend = 'positive';
                        else trend = 'negative';
                        return (
                            <li className={p('item')} key={item.id}>
                                <div className={p('time')}>{parseTime(item.timestamp * 1000, '{h}:{i}')}</div>
                                <div className={p('content')}>
                                    <div className={p('stars')}>
                                        {new Array(item.importance).fill().map((_, index) => <Icon symbolId="star" key={index}/>)}
                                        {item.calendarType === 'FE' && <span>事件</span>}
                                    </div>
                                    <a href="//calendar.wallstreetcn.com" target="_blank" rel="noopener noreferrer"><div className={p('title-container')}><span className={p('country')}>{item.country}</span>{item.title}</div></a>
                                    <div className={p('data')} data-show={item.calendarType === 'FD'}>
                                        <div className={p('previous')}>前值：<span>{item.previous || '- -'}</span></div>
                                        <div className={p('forecast')}>预测：<span>{item.forecast || '- -'}</span></div>
                                        <div className={p('actual')}>今值：<span data-trend={trend}>{item.actual || '- -'}</span></div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}


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
            <Hoverable className={this.props.className} name={this.props.name}>
                <Tab />
            </Hoverable>
        );
    }
}
