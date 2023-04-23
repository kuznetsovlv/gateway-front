import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Table, DeleteButton, Button } from 'components';
import Icon from 'icon';

const DeviceItem = ({ uid, vendor, onUnbind, onEdit, onDelete }) => (
  <Table.Row title={`${vendor}/${uid}`}>
    <Table.Cell>{vendor}</Table.Cell>
    <Table.Cell>{uid}</Table.Cell>
    <Table.Cell>
      <Button
        type="ghost"
        circled
        onClick={useCallback(() => onEdit({ open: true, uid }), [uid, onEdit])}
      >
        <Icon name="edit" />
      </Button>
    </Table.Cell>
    <Table.Cell>
      <Button
        type="ghost"
        circled
        onClick={useCallback(
          () => onUnbind({ open: true, uid, vendor }),
          [uid, vendor, onUnbind]
        )}
      >
        <Icon name="out" />
      </Button>
    </Table.Cell>
    <Table.Cell>
      <DeleteButton
        onClick={useCallback(
          () => onDelete({ uid, vendor, open: true }),
          [uid, vendor]
        )}
      />
    </Table.Cell>
  </Table.Row>
);

DeviceItem.propTypes = {
  uid: PropTypes.number.isRequired,
  vendor: PropTypes.string.isRequired,
  onUnbind: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default DeviceItem;
