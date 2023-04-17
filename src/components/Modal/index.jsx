import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Portal from './Portal';

const PortedModal = props => (
  <Portal>
    <Modal {...props} />
  </Portal>
);

PortedModal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

PortedModal.defaultProps = {
  actions: [],
  open: false,
  loading: false,
  title: null
};

export default PortedModal;
