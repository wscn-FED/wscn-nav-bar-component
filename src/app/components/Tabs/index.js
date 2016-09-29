import React from 'react';
import { Motion, spring } from 'react-motion';
import classname, { withPrefix } from '#/utils/classnames';
import './index.scss';

export default
class Tabs extends React.Component {
    static defaultProps = {
        prefix: 'tabs'
    }
    state = {
        index: 0
    }

    onTabClicked = index => () => this.setState({index})

    mapChildToNavItem = (child, index) => <div className={withPrefix(this.props.prefix)('nav-item')} onClick={this.onTabClicked(index)} data-active={index === this.state.index}>{child.props.name}</div>

    mapChildToNavContent = (child, index) => React.cloneElement(child, {
        activated: index === this.state.index
    })

    render() {
        const Children = React.Children.toArray(this.props.children);
        const p = withPrefix(this.props.prefix);
        if (!Children.length) return <div className={classname(p(), this.props.className)} />;
        return (
            <div className={classname(p(), this.props.className)} >
                <div className={p('nav-container')} >
                    <div className={p('nav')} >
                        {React.Children.map(Children, this.mapChildToNavItem)}
                        <Motion style={{
                            x: spring(this.state.index)
                        }}>
                            {({x}) => <div style={{width: `${100 / this.props.children.length}%`, transform: `translate(${x * 100}%)`}} className={p('nav-indicator')} />}
                        </Motion>
                    </div>
                </div>
                <div className={p('content')} >
                    {Children.map(this.mapChildToNavContent)}
                </div>
            </div>
        );
    }
}


export
class TabPane extends React.PureComponent {
    static defaultProps = {
        prefix: 'tab-pane'
    }
    render() {
        return (
            <div className={withPrefix(this.props.prefix)()} data-active={this.props.activated}>
                {React.cloneElement(this.props.children, {activated: this.props.activated})}
            </div>
        );
    }
}
