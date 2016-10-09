import React from 'react';
import withOpen from '#/HOC/withOpen';
import classname, { withPrefix } from '#/utils/classnames';
import './index.scss';

@withOpen
export default
class Hoverable extends React.PureComponent {
    static defaultProps = {
        prefix: 'hoverable'
    }

    render() {
        const p = withPrefix(this.props.prefix);
        return (
            <div className={classname(p(), this.props.className)}>
                <div className={p('name')}>{this.props.name}</div>
                <div className={p('content')} data-open={this.props.open}>
                    {React.cloneElement(this.props.children, {open: this.props.open})}
                </div>
            </div>
        );
    }
}
