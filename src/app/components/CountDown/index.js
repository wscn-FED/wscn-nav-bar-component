import React from 'react';
import countdown from 'countdown';
import classnames, {withPrefix} from '#/utils/classnames';
import './index.scss';

export default
class CountDown extends React.Component {
    static defaultProps = {
        prefix: 'count-down'
    };

    state = {};

    componentDidMount() {
        console.log(new Date(this.props.to), this.props.to);
        this.interval = countdown(timespan => this.setState({timespan}), new Date(this.props.to.replace(/-/g, '/')));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (!this.state.timespan) return null;
        const {timespan} = this.state;
        if (!timespan.hours) return false;
        const arr = [['years', '年'], ['months', '月'], ['days', '日'], ['hours', '小时'], ['minutes', '分'], ['seconds', '秒']].map(([key, display]) => [key, display, timespan[key]]);

        const p = withPrefix(this.props.prefix);

        return (
            <div className={classnames(p(), this.props.className)}>
                {
                    arr.map(([key, display, value], index) => (
                        <div className={p(key)} key={key} data-show={arr.slice(0, index + 1).some(item => item[2])}>
                            {value}<span className={p('display-unit')}>{display}</span>
                        </div>
                    ))
                }
            </div>
        );
    }
}
