import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Table, DeleteButton } from 'components';
import { DEVICE_ROUTE } from 'routes';

const DeviceItem = ({ uid, vendor, onUnbind }) => (
  <Table.Row link={`${DEVICE_ROUTE}?uid=${uid}`} title={`${vendor}/${uid}`}>
    <Table.Cell>{vendor}</Table.Cell>
    <Table.Cell>{uid}</Table.Cell>
    <Table.Cell>
      <DeleteButton
        onClick={useCallback(
          () => onUnbind({ uid, vendor, open: true }),
          [uid, vendor]
        )}
      />
    </Table.Cell>
  </Table.Row>
);

DeviceItem.propTypes = {
  uid: PropTypes.number.isRequired,
  vendor: PropTypes.string.isRequired,
  onUnbind: PropTypes.func.isRequired
};

export default DeviceItem;
