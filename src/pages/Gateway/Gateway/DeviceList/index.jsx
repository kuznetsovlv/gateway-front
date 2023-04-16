import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from 'components';

const DeviceList = ({ open, bound, onClose, onSave }) => {
  const [boundSet, setBoundSet] = useState(new Set(bound));
  const saveDisabled = useMemo(
    () => bound.length === boundSet.size && bound.every(boundSet.has),
    [bound, boundSet]
  );

  return (
    <Modal
      open={open}
      title="Device list"
      actions={[
        <Button
          key="apply"
          type="submit"
          disabled={saveDisabled}
          onClick={useCallback(() => {
            onSave(Array.from(boundSet));
            onClose();
          }, [boundSet])}
        >
          Apply
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>
      ]}
      onClose={onClose}
    >
      List
    </Modal>
  );
};

DeviceList.propTypes = {
  open: PropTypes.bool,
  bound: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

DeviceList.defaultProps = { open: false };

export default DeviceList;
