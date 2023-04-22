import React from 'react';
import PropTypes from 'prop-types';

import SVG from './SVG';

const PlusIcon = props => (
  <SVG {...props}>
    <g>
      <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
    </g>
  </SVG>
);

PlusIcon.propTypes = {
  size: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['normal', 'delete', 'submit', 'add', 'ghost'])
    .isRequired
};

export default PlusIcon;
