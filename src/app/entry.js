import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';
import defaultConfigs from './defaultConfigs.json';
import './styles/index.scss';

export default
class WSCNNavBar {
    constructor(config) {
        this.config = Object.assign({}, defaultConfigs, config);
    }

    init(el) {
        ReactDOM.render(
            <NavBar config={this.config} />,
            el
        );
    }
}

window.WSCNNavBar = WSCNNavBar;
