import React from 'react';
import c from 'classnames';

export default
class NavLogo extends React.PureComponent {
    static defaultProps = {
        className: 'nav_logo'
    }

    render() {
        return (
            <div className={c(this.props.className)}>
                <a href="/">
                    <img src="//walicdn.wallstcn.com/wscn/img/logo.png" alt="" />
                </a>
            </div>
        );
    }
}
