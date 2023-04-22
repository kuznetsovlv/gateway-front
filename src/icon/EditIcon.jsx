import React from 'react';
import PropTypes from 'prop-types';

import SVG from './SVG';

const EditIcon = props => (
  <SVG {...props}>
    <g>
      <path d="M22.94,1.06a3.626,3.626,0,0,0-5.124,0L0,18.876V24H5.124L22.94,6.184A3.627,3.627,0,0,0,22.94,1.06ZM4.3,22H2V19.7L15.31,6.4l2.3,2.3ZM21.526,4.77,19.019,7.277l-2.295-2.3L19.23,2.474a1.624,1.624,0,0,1,2.3,2.3Z" />
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
