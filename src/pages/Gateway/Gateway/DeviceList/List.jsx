import React, { useState, useCallback, useRef } from 'react';
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
 * @param {React.Ref<DeviceStore|null>} deviceRef
 * @return {DeviceStore}
 */
const useDevice = (uid, deviceRef) => {
  const store = useStore();

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

  return deviceRef.current;
};

const List = observer(({ data }) => {
  const deviceRef = useRef(null);
  const [{ open, uid }, setOpenDevice] = useState({ open: false });
  const handleDeviceWindowClose = useCallback(() => {
    setOpenDevice({ open: false });
    deviceRef.current = null;
  }, []);

  console.log(data.list);

  const device = useDevice(uid, deviceRef);

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
          uid
            ? `Device ${device.originalVendor ?? device.uid}`
            : 'Creation new device'
        }
        actions={[
          <Button
            key="save"
            type="submit"
            disabled={device.saveDisabled}
            onClick={useCallback(() => {
              device.save();
              data.fetchData();
              handleDeviceWindowClose();
            }, [data, device])}
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
