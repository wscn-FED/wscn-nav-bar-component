import React from 'react';
import './index.scss';

const constInstance = (
    <div className="nav-item-profile">
        <span className="sign-in">登录</span>
        |
        <span className="sign-up">注册</span>
    </div>
);

export default
class Profile extends React.PureComponent {
    render() {
        return constInstance;
    }
}
