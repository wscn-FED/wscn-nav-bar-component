import React from 'react';
import classname from '#/utils/classnames';
import Hoverable from '#/components/Hoverable';
import './index.scss';

function generateColumn({title, items, className}) {
    return (
        <div className={classname('column', className)}>
            <div className="title">{title}</div>
            <ul>
                {items.map(item => {
                    const attrs = {
                        key: item.name
                    };
                    if (item.tag) {
                        attrs['data-tag'] = item.tag;
                    }

                    if (item.href) {
                        return <li {...attrs}><a href={item.href} target="_blank"rel="noopener noreferrer">{item.name}</a></li>;
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
            <div className="column download">
                <div className="title">App下载</div>
                <ul>
                    {this.props.apps.map(app => (
                        <li key={app.name} className="qr-code-container">
                            <img className="qr-code" src={app.qrcode} role="presentation"/>
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
        console.log(this.props.includes);
        const includes = this.props.includes.map(item => generateColumn(item));
        return (
            <Hoverable className={this.props.className} name={this.props.name}>
                <div className="more-tab">
                    {includes}
                    <Download apps={[
                        {
                            name: '华尔街见闻',
                            qrcode: 'https://walicdn.wallstcn.com//wscn/img/footer-qrcode.png?9197eaf99c',
                            href: '//wallstreetcn.com'
                        }
                    ]}/>
                </div>
            </Hoverable>
        );
    }
}
