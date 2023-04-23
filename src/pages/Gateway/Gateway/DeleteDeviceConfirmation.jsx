import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'components';

const DeleteDeviceConfirmation = ({ open, uid, vendor, onDelete, onClose }) => (
  <Modal
    open={open && !!uid && !!vendor}
    title="Delete Device Conversation"
    actions={[
      <Button
        key="delete"
        type="delete"
        onClick={useCallback(() => {
          onDelete(uid);
          onClose();
        }, [uid, onDelete, onClose])}
      >
        Delete
      </Button>,
      <Button key="cancel" type="normal" onClick={onClose}>
        Cancel
      </Button>
    ]}
    onClose={onClose}
  >
    <p>
      Do you really want to delete device {vendor}({uid})?
    </p>
  </Modal>
);

DeleteDeviceConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  uid: PropTypes.number,
  vendor: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

DeleteDeviceConfirmation.defaultProps = { uid: null, vendor: null };

export default DeleteDeviceConfirmation;
