import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default ComposedComponent => {
    class Preview extends Component {
        componentDidMount() {
            document.addEventListener('mouseenter', () => this.instance.show());
        }

        bindRef = ref => { this.instance = ref; }

        render() {
            return (
                <ComposedComponent ref={this.bind} {...this.props}>
                    {this.props.children}
                </ComposedComponent >
            );
        }
    }
    return Preview;
};
