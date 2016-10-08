import React from 'react';
import withDimension from '#/utils/withDimension';
import './index.scss';

@withDimension({once: true})
export default
class NavRest extends React.PureComponent {
    static defaultProps = {
        className: 'nav-rest'
    }
    render() {
        console.log(this.props);
        if (this.props.dimension.right && this.props.dimension.right > this.props.dimension.windowWidth) return <div className={this.props.className}>。。。</div>;
        return (
            <div className={this.props.className}>
                {this.props.items.map(item => <div key={item.name}>{item.name}</div>)}
            </div>
        );
    }
}
