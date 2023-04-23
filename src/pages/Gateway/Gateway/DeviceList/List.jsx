import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { AddButton, Table } from 'components';
import { DeviceListStore } from '../../store';
import DeviceEditor from '../DeviceEditor';
import DeviceItem from './DeviceItem';

const List = observer(({ data, onDelete }) => {
  const [{ open, uid }, setOpenDevice] = useState({ open: false });
  const handleDeviceWindowClose = useCallback(() => {
    setOpenDevice({ open: false });
  }, []);

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
            <DeviceItem
              key={uid}
              uid={uid}
              selectDisabled={disabled}
              vendor={vendor}
              selected={selected}
              editDisabled={bound}
              onSelect={data.select}
              onEdit={setOpenDevice}
              onDelete={onDelete}
            />
          ))}
        </Table.Body>
      </Table>
      <AddButton
        text="New"
        disabled={open}
        onClick={useCallback(() => setOpenDevice({ open: true }), [])}
      />

      <DeviceEditor
        open={open}
        uid={uid}
        onAfterSave={data.fetchData}
        onClose={handleDeviceWindowClose}
      />
    </>
  );
});

List.propTypes = {
  data: PropTypes.instanceOf(DeviceListStore).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default List;
