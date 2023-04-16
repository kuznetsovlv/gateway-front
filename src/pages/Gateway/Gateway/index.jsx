import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { MAX_DEVICES_PER_GATEWAY } from 'globalConstants';
import {
  Page,
  Switcher,
  Input,
  IPInput,
  Button,
  Table,
  AddButton
} from 'components';
import GatewayStore from '../store/GatewayStore';
import DeviceItem from './DeviceItem';
import DeviceList from './DeviceList';
import styles from './GateWay.module.scss';

const Gateway = observer(({ data }) => {
  const [{ uid, vendor, open }, setOpenConfirmation] = useState({
    open: false
  });
  const [openAdd, setOpenAdd] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState(data.name);
  const [ip, setIp] = useState(data.ip);

  useEffect(() => {
    setName(data.name);
    setIp(data.ip);
  }, [data.name, data.ip]);

  const changed = data.name !== name || data.ip !== ip;

  const submitDisabled = disabled || !changed || !name || ip === null;

  console.log(open, uid, vendor);

  return (
    <Page loading={data.loading} title={`Gateway ${data.name}`}>
      <Switcher
        className={styles.switcher}
        checked={!disabled}
        onLabel="Edit"
        onChange={setDisabled}
      />
      <Input
        label="Name"
        disabled={disabled}
        value={disabled ? data.name : name}
        placeholder="Gateway's name"
        required
        onChange={setName}
      />
      <IPInput
        label="IP"
        disabled={disabled}
        value={disabled ? data.ip : ip}
        placeholder="Gateway's ip"
        required
        onChange={setIp}
      />
      <Button
        className={styles.submit}
        type="submit"
        disabled={submitDisabled}
        onClick={useCallback(() => {
          setDisabled(true);
          data.saveData({ name, ip });
        }, [name, ip, data])}
      >
        Save
      </Button>

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
              onUnbind={setOpenConfirmation}
            />
          ))}
        </Table.Body>
      </Table>
      <AddButton
        text="Add device"
        disabled={data.devices.length >= MAX_DEVICES_PER_GATEWAY || openAdd}
        onClick={useCallback(() => setOpenAdd(true), [])}
      />

      <DeviceList
        open={openAdd}
        onClose={useCallback(() => setOpenAdd(false), [])}
        onSave={console.log}
        bound={data.devices.map(({ uid }) => uid)}
      />
    </Page>
  );
});

Gateway.propTypes = {
  data: PropTypes.instanceOf(GatewayStore).isRequired
};

export default Gateway;
