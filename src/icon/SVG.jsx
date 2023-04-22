import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {'normal'|'delete'|'submit'|'add'|'ghost'} type
 * @param {boolean} disabled
 * @return {string}
 */
const useColor = (type, disabled) => {
  if (disabled) {
    return '#10101055';
  }

  switch (type) {
    case 'delete':
      return '#f00';
    case 'submit':
      return '#00008b';
    case 'add':
      return '#006400';
    case 'ghost':
      return '#fffa';
    case 'normal':
    default:
      return '#000';
  }
};

const SVG = ({ children, size, disabled, type }) => (
  <svg
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={useColor(type, disabled)}
  >
    {children}
  </svg>
);

SVG.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['normal', 'delete', 'submit', 'add', 'ghost'])
    .isRequired
};

export default SVG;
