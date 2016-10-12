import React from 'react';
import './index.scss';

// for svg sprites
const r = require.context('#/static/icons', false, /\.svg$/);
r.keys().forEach(key => r(key));

export default class Icon extends React.PureComponent {
  static propTypes = {
    symbolId: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  };

  render() {
    const { className, symbolId } = this.props;
    const iconClass = className
      ? `icon icon-${symbolId} ${className}`
      : `icon icon-${symbolId}`;
    return (
      <svg className={iconClass}>
        <use xlinkHref={`#${symbolId}`} />
      </svg>
  );
  }
}
