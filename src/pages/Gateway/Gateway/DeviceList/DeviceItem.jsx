import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Button, Checkbox, DeleteButton, Table } from 'components';
import Icon from 'icon';

const DeviceItem = ({
  uid,
  vendor,
  selected,
  selectDisabled,
  editDisabled,
  onSelect,
  onEdit,
  onDelete
}) => (
  <Table.Row>
    <Table.Cell>
      <Checkbox
        checked={selected}
        disabled={selectDisabled}
        name={uid}
        onChange={onSelect}
      />
    </Table.Cell>
    <Table.Cell>{vendor}</Table.Cell>
    <Table.Cell>{uid}</Table.Cell>
    <Table.Cell>
      <Button
        type="ghost"
        circled
        disabled={editDisabled}
        onClick={useCallback(() => onEdit({ open: true, uid }), [uid, onEdit])}
      >
        <Icon name="edit" disabled={editDisabled} />
      </Button>
    </Table.Cell>
    <Table.Cell>
      <DeleteButton
        disabled={editDisabled}
        onClick={useCallback(
          () => onDelete({ open: true, uid, vendor }),
          [uid, vendor, onDelete]
        )}
      />
    </Table.Cell>
  </Table.Row>
);

DeviceItem.propTypes = {
  uid: PropTypes.number.isRequired,
  vendor: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectDisabled: PropTypes.bool.isRequired,
  editDisabled: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default DeviceItem;
