import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default ComposedComponent => {
    class Open extends Component {
        state = {open: false}

        componentDidMount() {
            this.el.addEventListener('mouseenter', this.onMouseEnter);
            this.el.addEventListener('mouseleave', this.onMouseLeave);
        }

        componentWillUnmount() {
            this.el.removeEventListener('mouseenter', this.onMouseEnter);
            this.el.removeEventListener('mouseleave', this.onMouseLeave);
        }

        onMouseEnter = () => this.setState({open: true})

        onMouseLeave = () => this.setState({open: true})

        bindRef = ref => {
            this.el = ReactDOM.findDOMNode(ref); // eslint-disable-line
        }

        render() {
            return <ComposedComponent ref={this.bindRef} {...this.props} {...this.state} />;
        }
    }
    return Open;
};
