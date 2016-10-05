/**
 * Created by fengyuanzemin on 16/9/28.
 */
import React from 'react';
import withOpen from '../../../utils/withOpen';
import withData from '../../../utils/withData';
import c from '../../../utils/c';
import Card from './Card';
import './index.scss';


class DiscussionsContent extends React.PureComponent {
    static defaultProps = {
        className: 'discussions-content'
    };

    // data, loading, error, fetchData, open, api

    render() {
        if (this.props.loading) return <div>加载中...</div>;
        if (this.props.error) return <div>加载失败</div>;
        console.log(this.props.data);
        return (
            <div className={c(this.props.className)} data-open={this.props.open}>
                {this.props.data.map((v) => (
                    <Card key={v.id} data={v}/>
                ))}
            </div>
        );
    }
}

@withOpen
export default
class Discussions extends React.PureComponent {
    static defaultProps = {
        className: 'nav-item-discussions'
    };

    constructor(props) {
        super(props);
        this.DiscussionsContent = withData(this.props.api, res => res.data.results)(DiscussionsContent);
    }

    render() {
        const D = this.DiscussionsContent;
        return (
            <div className={c(this.props.className)}>
                <span>{this.props.name}</span>
                <D open={this.props.open} api={this.props.api}/>
            </div>
        );
    }
}
