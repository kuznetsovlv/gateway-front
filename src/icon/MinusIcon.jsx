import React from 'react';
import PropTypes from 'prop-types';

import SVG from './SVG';

const HEIGHT = 64;
const WIDTH = 350;
const RX = HEIGHT / 2;
const Y = 256 - RX;
const X = (512 - WIDTH) / 2;

const MinusIcon = props => (
  <SVG {...props}>
    <rect x={X} y={Y} width={WIDTH} height={HEIGHT} rx={RX} />
  </SVG>
);

MinusIcon.propTypes = {
  size: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['normal', 'delete', 'submit', 'add', 'ghost'])
    .isRequired
};

export default MinusIcon;
