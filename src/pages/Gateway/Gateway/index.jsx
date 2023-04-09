import React from 'react';
import PropTypes from 'prop-types';

const Gateway = ({ serial }) => <>Gateway {serial}</>;

Gateway.propTypes = { serial: PropTypes.string.isRequired };

export default Gateway;
