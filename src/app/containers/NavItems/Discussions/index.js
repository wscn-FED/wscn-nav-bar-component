/**
 * Created by fengyuanzemin on 16/9/28.
 */
import React from 'react';
import withOpen from '#/HOC/withOpen';
import withData from '#/HOC/withData';
import Loading from '#/components/Loading';
import Retry from '#/components/Retry';
import Hoverable from '#/components/Hoverable';
import Card from './Card';
import './index.scss';


class DiscussionsContent extends React.PureComponent {
    static defaultProps = {
        className: 'discussions-content'
    };

    componentDidMount() {
        if (this.props.open && !this.props.data) this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open && !nextProps.data) this.props.fetchData();
    }

    render() {
        if (this.props.loading) return <Loading className="discussions-loading" />;
        if (this.props.error) return <Retry className="discussions-retry" onClick={this.props.fetchData} />;
        return (
            <div className={this.props.className}>
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
        this.DiscussionsContent = withData(this.props.api, res => res.data.results, {fetchAfterMount: false})(DiscussionsContent);
    }

    render() {
        const DiscussionsContainer = this.DiscussionsContent;
        return (
            <Hoverable className={this.props.className} name={this.props.name}>
                <DiscussionsContainer className="discussion-container" api={this.props.api}/>
            </Hoverable>
        );
    }
}
