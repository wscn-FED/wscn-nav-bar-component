import axios from 'axios';
import React from 'react';

const MINIMUM_FETCH_INTERVAL = 5000;

export default (config, map, {fetchOnRerender, fetchAfterMount = true} = {}) => ComposedComponent => {
    class WithData extends React.Component {
        state = {
            data: null,
            loading: true,
            error: null
        }

        componentDidMount() {
            if (fetchAfterMount) this.fetchData();
            this.mounted = true;
        }

        componentWillReceiveProps() {
            if (fetchOnRerender) this.fetchData();
        }

        componentWillUnmount() {
            this.mounted = false;
        }


        mounted = false;

        fetchData = () => {
            if (this.latestFetchAt && Date.now() - this.latestFetchAt < MINIMUM_FETCH_INTERVAL) return;
            this.setState({
                loading: true
            });
            this.latestFetchAt = Date.now();
            let p;
            if (Array.isArray(config)) {
                p = Promise.all(config.map(item => axios(item)));
            } else {
                p = axios(config);
            }
            p.then(res => {
                if (this.mounted) {
                    this.setState({
                        loading: false,
                        data: map ? map(res) : res
                    });
                }
            })
            .catch(err => {
                if (this.mounted) {
                    this.setState({
                        error: err,
                        loading: false
                    });
                }
            });
        }

        render() {
            return <ComposedComponent {...this.props} {...this.state} fetchData={this.fetchData} />;
        }
    }

    return WithData;
};
