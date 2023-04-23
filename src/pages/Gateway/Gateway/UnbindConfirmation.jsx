import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'components';

const UnbindDeviceConfirmation = ({ open, uid, vendor, onUnbind, onClose }) => (
  <Modal
    open={open && !!uid && !!vendor}
    title="Unbind Device Conversation"
    actions={[
      <Button
        key="delete"
        type="delete"
        onClick={useCallback(() => {
          onUnbind(uid);
          onClose();
        }, [uid, onUnbind, onClose])}
      >
        Unbind
      </Button>,
      <Button key="cancel" type="normal" onClick={onClose}>
        Cancel
      </Button>
    ]}
    onClose={onClose}
  >
    <p>
      Do you really want to unbind device {vendor}({uid})?
    </p>
  </Modal>
);

UnbindDeviceConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  uid: PropTypes.number,
  vendor: PropTypes.string,
  onUnbind: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

UnbindDeviceConfirmation.defaultProps = { uid: null, vendor: null };

export default UnbindDeviceConfirmation;
