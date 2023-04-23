import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { MAX_DEVICES_PER_GATEWAY } from 'globalConstants';
import {
  Page,
  Switcher,
  Table,
  AddButton,
  Gateway as GatewayComponent
} from 'components';
import GatewayStore from '../store/GatewayStore';
import DeviceItem from './DeviceItem';
import DeviceList from './DeviceList';
import styles from './Gateway.module.scss';

const Gateway = observer(({ data }) => {
  const [
    { uid: unbindUid, vendor: unbindVendor, open: unbindOpen },
    setOpenUnbindConfirmation
  ] = useState({
    open: false
  });
  const [
    { uid: deleteUid, vendor: deleteVendor, open: deleteOpen },
    setOpenDeleteConfirmation
  ] = useState({ open: false });
  const [openAdd, setOpenAdd] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [name, setName] = useState(data.name);
  const [ip, setIp] = useState(data.ip);

  const disabled = !enabled;

  useEffect(() => {
    setName(data.name);
    setIp(data.ip);
  }, [data.name, data.ip]);

  const changed = data.name !== name || data.ip !== ip;

  console.log(unbindOpen, unbindUid, unbindVendor);
  console.log(deleteOpen, deleteUid, deleteVendor);

  return (
    <Page loading={data.loading} title={`Gateway ${data.name}`}>
      <Switcher
        className={styles.switcher}
        checked={enabled}
        onLabel="Edit"
        onChange={setEnabled}
      />
      <GatewayComponent
        name={disabled ? data.name : name}
        ip={disabled ? data.ip : ip}
        disabled={disabled}
        saveDisabled={!changed || !name || ip === null}
        onNameChange={setName}
        onIPChange={setIp}
        onSave={useCallback(() => {
          setEnabled(true);
          data.saveData({ name, ip });
        }, [name, ip, data])}
      />

      <Table className={styles.devices}>
        <Table.Header>
          <Table.Cell>Vendor</Table.Cell>
          <Table.Cell>UID</Table.Cell>
          <Table.Cell />
        </Table.Header>
        <Table.Body>
          {data.devices.map(({ uid, vendor }) => (
            <DeviceItem
              key={uid}
              uid={uid}
              vendor={vendor}
              onUnbind={setOpenUnbindConfirmation}
            />
          ))}
        </Table.Body>
      </Table>
      <AddButton
        text="Edit device list"
        disabled={data.devices.length >= MAX_DEVICES_PER_GATEWAY || openAdd}
        onClick={useCallback(() => setOpenAdd(true), [])}
      />

      <DeviceList
        open={openAdd}
        onClose={useCallback(() => setOpenAdd(false), [])}
        onSave={useCallback(devices => data.saveData({ devices }), [data])}
        bound={data.bound}
        onDelete={setOpenDeleteConfirmation}
      />
    </Page>
  );
});

Gateway.propTypes = {
  data: PropTypes.instanceOf(GatewayStore).isRequired
};

export default Gateway;
