/**
 * Created by fengyuanzemin on 16/9/28.
 */
import React from 'react';
import c from '../../../../utils/c';
import './index.scss';

export default
class Card extends React.PureComponent {
    static defaultProps = {
        className: 'discussion-card'
    };

    render() {
        return (
            <div className={c(this.props.className)}>
                <h4 className={c('header')}>

                </h4>
                <p className={c('content')}>

                </p>
                <div className={c('tag')}>

                </div>
            </div>
        );
    }
}