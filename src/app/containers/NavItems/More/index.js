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
                    if (item.tag) return <li key={item.name} data-tag={item.tag}><a href={item.href} target="_blank" rel="noopener noreferrer">{item.name}</a></li>;
                    return <li key={item.name}><a href={item.href} target="_blank" rel="noopener noreferrer">{item.name}</a></li>;
                })}
            </ul>
        </div>
    );
}

const JianWen = generateColumn({
    title: '华尔街见闻',
    items: [
        {name: '资讯', href: '//wallstreetcn.com/news'},
        {name: '社区', href: '//s.wallstreetcn.com/discussions'},
        {name: '实时', href: '//markets.wallstreetcn.com'},
        {name: '专栏', href: '//zhuanlan.wallstreetcn.com', tag: 'new'},
        {name: '行情', href: '//markets.wallstreetcn.com'},
        {name: '影音', href: '//audio.wallstreetcn.com', tag: 'new'},
        {name: '日历', href: '//calendar.wallstreetcn.com'}
    ],
    className: 'jianwen'
});

const WEEX = generateColumn({
    title: 'WEEX',
    items: [
        {name: '外汇', href: '//strategy.weex.in/'},
        {name: '基金', href: '//strategy.weex.in/'},
        {name: 'A股', href: '//strategy.weex.in/'}
    ]
});

const Others = generateColumn({
    title: '其他产品',
    items: [
        {name: '选股宝', href: '//bao.wallstreetcn.com/static/app_pc.html?from=wscnpc_navbar'},
        {name: '贵金属', href: '//www.goldtoutiao.com/'}
    ]
});

const JoinUs = generateColumn({
    title: '加入我们',
    items: [
        {name: 'W Club', href: '//club.wallstreetcn.com'},
        {name: '见闻招聘', href: '//wallstreetcn.com/joinus'}
    ]
});

class Download extends React.PureComponent {
    render() {
        return (
            <div className="column download">
                <div className="title">App下载</div>
                <ul>
                    {this.props.apps.map(app => (
                        <li key={app.name} className="qr-code-container">
                            <img className="qr-code" src={app.qrcode} role="presentation"/>
                            <a href={app.href} target="_blank" rel="noopener noreferrer"><div>{app.name}</div></a>
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
        return (
            <Hoverable className={this.props.className} name={<span>{this.props.name}</span>}>
                <div className="more-tab">
                    {JianWen}
                    {WEEX}
                    {Others}
                    {JoinUs}
                    <Download apps={[
                        {name: '华尔街见闻', qrcode: 'https://walicdn.wallstcn.com//wscn/img/footer-qrcode.png?9197eaf99c', href: '//wallstreetcn.com'}
                    ]} />
                </div>
            </Hoverable>
        );
    }
}
