import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { AddButton, Modal, Button } from 'components';
import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';
import {
  DeviceListStore,
  DeviceStore,
  DeviceMapStore,
  DEVICE_MAP_STORE_KEY
} from '../../store';
import DeviceEditor from './DeviceEditor';

/**
 * @param {number} [uid]
 * @return {DeviceStore}
 */
const useDevice = uid => {
  const store = useStore();

  if (!store.has(DEVICE_MAP_STORE_KEY)) {
    store.set(DEVICE_MAP_STORE_KEY, new DeviceMapStore());
  }

  const map = store.get(DEVICE_MAP_STORE_KEY);

  const device =
    uid && map.has(uid)
      ? map.get(uid)
      : new DeviceStore({
          uid,
          errorProcessor: store.get(ERROR_PROCESSOR_KEY)
        });

  if (uid && !map.has(uid)) {
    map.set(uid, device);
  }

  return device;
};

const List = observer(({ data }) => {
  const [{ open, uid }, setOpenDevice] = useState({ open: false });
  const handleDeviceWindowClose = useCallback(
    () => setOpenDevice({ open: false }),
    []
  );

  const device = useDevice(uid);

  return (
    <>
      Device List
      <AddButton
        text="New"
        disabled={open}
        onClick={useCallback(() => setOpenDevice({ open: true }), [])}
      />
      <Modal
        open={open}
        loading={device.loading}
        title={
          uid ? `Device ${device.vendor ?? device.uid}` : 'Creation new device'
        }
        actions={[
          <Button
            key="save"
            type="submit"
            disabled={data.saveDisabled}
            onClick={device.save}
          >
            Save
          </Button>,
          <Button key="cancel" onClick={handleDeviceWindowClose}>
            Cancel
          </Button>
        ]}
        onClose={handleDeviceWindowClose}
      >
        <DeviceEditor data={device} />
      </Modal>
    </>
  );
});

List.propTypes = { data: PropTypes.instanceOf(DeviceListStore).isRequired };

export default List;
