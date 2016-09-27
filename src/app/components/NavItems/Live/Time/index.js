import React from 'react';
import { parseTime } from '../../../../utils/time';
import c from '../../../../utils/c';
import './index.scss';

export default
class Time extends React.Component {
    static defaultProps = {
        className: 'live-time'
    }
    state = {
        currentTime: Date.now()
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                currentTime: Date.now()
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className={c(this.props.className)}>{parseTime(this.state.currentTime)}</div>
        );
    }
}
