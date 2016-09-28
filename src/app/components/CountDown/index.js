import React from 'react';
import countdown from 'countdown';
import c from '../../utils/c';
import './index.scss';

export default
class CountDown extends React.Component {
    static defaultProps = {
        className: 'count-down'
    }

    state = {}

    componentDidMount() {
        this.interval = countdown(timespan => this.setState({timespan}), this.props.to);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (!this.state.timespan) return null;
        const { timespan } = this.state;
        const arr = [['years', '年'], ['months', '月'], ['days', '日'], ['hours', '小时'], ['minutes', '分'], ['seconds', '秒']].map(([key, value]) => [key, value, timespan[key]]);

        return (
            <div className={c(this.props.className)}>
                {
                    arr.map(([key, display, value], index) => <div key={key} data-show={arr.slice(0, index + 1).some(item => item[2])}>{value}<span>{display}</span></div>)
                }
            </div>
        );
    }
}
