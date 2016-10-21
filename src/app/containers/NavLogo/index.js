import React from 'react';
import c from 'classnames';
import Icon from '#/components/Icon';
import './index.scss';

export default
class NavLogo extends React.PureComponent {
    static defaultProps = {
        className: 'nav-logo'
    }

    render() {
        return (
            <div className={c(this.props.className)}>
                <a href="/">
                    <Icon symbolId="logo" />
                </a>
            </div>
        );
    }
}
