import React from 'react';
import classname from '#/utils/classnames';
import Hoverable from '#/components/Hoverable';
import './index.scss';

function generateColumn({title, items, className}) {
    return (
        <div key={'more' + title} className={classname('nav-column', className)}>
            <div className="nav-column-title">{title}</div>
            <ul>
                {items.map(item => {
                    const attrs = {
                        key: 'more' + item.name
                    };
                    if (item.tag) {
                        attrs['data-tag'] = item.tag;
                    }

                    if (item.href) {
                        return (<li {...attrs}>
                            <a href={item.href} target="_blank" rel="noopener noreferrer">{item.name}</a>
                        </li>);
                    }


                    return <li {...attrs}>{item.name}</li>;
                })}
            </ul>
        </div>
    );
}

class Download extends React.PureComponent {
    render() {
        return (
            <div className="nav-column download">
                <div className="nav-column-title">App下载</div>
                <ul>
                    {this.props.apps.map(app => (
                        <li key={app.name} className="qr-code-container">
                            <a href={app.href} target="_blank" rel="noopener noreferrer">
                                <img className="qr-code" src={app.qrcode} role="presentation"/>
                            </a>
                            <a href={app.href} target="_blank" rel="noopener noreferrer">
                                <div>{app.name}</div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}


export default
class More extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-more'
    };

    render() {
        const props = this.props;
        const includes = props.includes.map(item => generateColumn(item));
        return (
            <Hoverable className={props.className} name={props.name}>
                <div className="more-tab">
                    {includes}
                    <Download apps={props.downloadsMap}/>
                </div>
            </Hoverable>
        );
    }
}
