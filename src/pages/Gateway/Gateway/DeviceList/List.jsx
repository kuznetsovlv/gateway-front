import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import {
  AddButton,
  Modal,
  Button,
  Table,
  Checkbox,
  DeleteButton
} from 'components';
import Icon from 'icon';
import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';
import {
  DeviceListStore,
  DeviceStore,
  DeviceMapStore,
  DEVICE_MAP_STORE_KEY
} from '../../store';
import DeviceEditor from './DeviceEditor';

const useDevice = (uid, open) => {
  const deviceRef = useRef(null);
  const store = useStore();

  if (open) {
    if (!deviceRef.current) {
      if (!store.has(DEVICE_MAP_STORE_KEY)) {
        store.set(DEVICE_MAP_STORE_KEY, new DeviceMapStore());
      }

      const map = store.get(DEVICE_MAP_STORE_KEY);

      console.log(uid, map.has(uid));

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

const List = observer(({ data }) => {
  const [{ open, uid }, setOpenDevice] = useState({ open: false });
  const handleDeviceWindowClose = useCallback(() => {
    setOpenDevice({ open: false });
  }, []);

  const device = useDevice(uid, open);

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Cell>Bound</Table.Cell>
          <Table.Cell>Vendor</Table.Cell>
          <Table.Cell>UID</Table.Cell>
          <Table.Cell />
          <Table.Cell />
        </Table.Header>
        <Table.Body>
          {data.list.map(({ uid, vendor, selected, disabled, bound }) => (
            <Table.Row key={uid}>
              <Table.Cell>
                <Checkbox
                  checked={selected}
                  disabled={disabled}
                  name={uid}
                  onChange={data.select}
                />
              </Table.Cell>
              <Table.Cell>{vendor}</Table.Cell>
              <Table.Cell>{uid}</Table.Cell>
              <Table.Cell>
                <Button
                  type="ghost"
                  circled
                  onClick={() => setOpenDevice({ open: true, uid })}
                >
                  <Icon name="edit" />
                </Button>
              </Table.Cell>
              <Table.Cell>
                <DeleteButton disabled={bound} onClick={console.log} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddButton
        text="New"
        disabled={open}
        onClick={useCallback(() => setOpenDevice({ open: true }), [])}
      />
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
        {device ? <DeviceEditor data={device} /> : <></>}
      </Modal>
    </>
  );
});

List.propTypes = { data: PropTypes.instanceOf(DeviceListStore).isRequired };

export default List;
