import React from 'react';
import Time from '#/components/Time';
import './index.scss';

export default
class Clock extends React.Component {
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
            <Time className={this.props.className} date={new Date(this.state.currentTime)} />
        );
    }
}
