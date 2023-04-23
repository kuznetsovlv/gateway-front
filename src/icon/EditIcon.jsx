import React from 'react';
import PropTypes from 'prop-types';

import SVG from './SVG';

const EditIcon = props => (
  <SVG {...props}>
    <g>
      <path d="M 489.386719 22.613281 C 459.1875 -7.539062 410.273438 -7.539062 380.074219 22.613281 L 0 402.6875 L 0 512 L 109.3125 512 L 489.386719 131.925781 C 519.527344 101.722656 519.527344 52.816406 489.386719 22.613281 Z M 91.734375 469.332031 L 42.667969 469.332031 L 42.667969 420.265625 L 326.613281 136.535156 L 375.679688 185.601562 Z M 459.222656 101.761719 L 405.738281 155.242188 L 356.777344 106.175781 L 410.238281 52.777344 C 423.789062 39.230469 445.757812 39.230469 459.308594 52.777344 C 472.855469 66.328125 472.855469 88.296875 459.308594 101.84375 Z M 459.222656 101.761719 " />
    </g>
  </SVG>
);

EditIcon.propTypes = {
  size: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['normal', 'delete', 'submit', 'add', 'ghost'])
    .isRequired
};

export default EditIcon;
