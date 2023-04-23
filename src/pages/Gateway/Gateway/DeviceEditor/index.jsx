import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Modal, Button } from 'components';
import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';
import { DeviceStore, DeviceMapStore, DEVICE_MAP_STORE_KEY } from '../../store';
import Editor from './Editor';

/**
 * @param {number} uid
 * @param {boolean} open
 * @return {DeviceStore|null}
 */
const useDevice = (uid, open) => {
  const deviceRef = useRef(null);
  const store = useStore();

  if (open) {
    if (!deviceRef.current) {
      if (!store.has(DEVICE_MAP_STORE_KEY)) {
        store.set(DEVICE_MAP_STORE_KEY, new DeviceMapStore());
      }

      const map = store.get(DEVICE_MAP_STORE_KEY);

      deviceRef.current =
        uid && map.has(uid)
          ? map.get(uid)
          : new DeviceStore({
              uid,
              errorProcessor: store.get(ERROR_PROCESSOR_KEY)
            });

      if (uid && !map.has(uid)) {
        map.set(uid, deviceRef.current);
      }
    }
  } else {
    deviceRef.current = null;
  }

  return deviceRef.current;
};

const DeviceEditor = observer(({ open, uid, onClose, onAfterSave }) => {
  const device = useDevice(uid, open);

  return (
    <Modal
      open={open && !!device}
      loading={open && !!device?.loading}
      title={
        uid
          ? `Device ${device.originalVendor ?? device.uid}`
          : 'Creation new device'
      }
      actions={[
        <Button
          key="save"
          type="submit"
          disabled={!!device?.saveDisabled}
          onClick={useCallback(() => {
            device?.save();
            onAfterSave();
            onClose();
          }, [device, onClose])}
        >
          Save
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>
      ]}
      onClose={onClose}
    >
      {device ? <Editor data={device} /> : <></>}
    </Modal>
  );
});

DeviceEditor.propTypes = {
  open: PropTypes.bool,
  uid: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  onClose: PropTypes.func.isRequired,
  onAfterSave: PropTypes.func.isRequired
};

DeviceEditor.defaultProps = { open: false, uid: null };

export default DeviceEditor;
