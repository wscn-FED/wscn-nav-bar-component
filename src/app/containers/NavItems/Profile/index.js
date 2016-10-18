import React from 'react';
import './index.scss';


export default
class Profile extends React.PureComponent {

    noop = () => {
        console.log('cb is not a fn');
    };

    isFn = (cb) => {
        const cbFn = typeof cb === 'function' ? cb : this.noop;
        return cbFn;
    };

    loginClick = () => {
        const cb = this.isFn(this.props.loginCBK);
        cb();
    };

    registerClick = () => {
        const cb = this.isFn(this.props.registerCBK);
        cb();
    };

    render() {
        return (
            <div className="nav-item-profile">
                <span onClick={this.loginClick} className="sign-in">登录</span>
                <span onClick={this.registerClick} className="sign-up">注册</span>
            </div>
        );
    }
}
