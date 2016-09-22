import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default ComposedComponent => {
    class WithHover extends Component {
        state = {hovered: false}

        componentDidMount() {
            this.el.addEventListener('mouseenter', this.onMouseEnter);
            this.el.addEventListener('mouseleave', this.onMouseLeave);
        }

        componentWillUnmount() {
            this.el.removeEventListener('mouseenter', this.onMouseEnter);
            this.el.removeEventListener('mouseleave', this.onMouseLeave);
        }

        onMouseEnter = () => this.setState({hovered: true})

        onMouseLeave = () => this.setState({hovered: false})

        bindRef = ref => {
            this.el = ReactDOM.findDOMNode(ref); // eslint-disable-line 
        }

        render() {
            return (
                <ComposedComponent ref={this.bindRef} {...this.props} {...this.state} >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    }
    return WithHover;
};
