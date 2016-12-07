import React from 'react';
import urlParse from 'url-parse';
import withOpen from '#/HOC/withOpen';
import classname, {withPrefix} from '#/utils/classnames';
import Icon from '#/components/Icon';
import './index.scss';

@withOpen
export default
class Hoverable extends React.PureComponent {
    static defaultProps = {
        prefix: 'hoverable'
    };

    render() {
        const p = withPrefix(this.props.prefix);
        if (this.props.href) {
            console.log(this.props);
            const parseResult = urlParse(this.props.href);
            const url = parseResult.hostname + parseResult.pathname;
            return (
                <div className={classname(p(), this.props.className)} data-active={location.href.includes(url)}>
                    <a href={this.props.href} target="_blank" rel="noopener noreferrer" data-tag={this.props.dataTag}>
                        <div className={p('name')}>
                            {this.props.name}
                            <Icon symbolId="arrow-down"/>
                        </div>
                    </a>
                    <div className={p('content')} data-open={this.props.open}>
                        {React.cloneElement(this.props.children, {open: this.props.open})}
                    </div>
                </div>
            );
        }
        return (
            <div className={classname(p(), this.props.className)}>
                <div className={p('name')}>
                    {this.props.name}
                    <Icon symbolId="arrow-down"/>
                </div>
                <div className={p('content')} data-open={this.props.open}>
                    {React.cloneElement(this.props.children, {open: this.props.open})}
                </div>
            </div>
        );
    }
}
