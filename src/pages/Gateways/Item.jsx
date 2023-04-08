import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { DeleteButton, Table } from 'components';
import { GATEWAY_ROUTE } from 'routes';

const Item = ({ serial, name, onClick }) => (
  <Table.Row
    key={serial}
    link={`${GATEWAY_ROUTE}?serial=${serial}`}
    title={`Gateway ${name}/${serial}`}
  >
    <Table.Cell>{name}</Table.Cell>
    <Table.Cell>{serial}</Table.Cell>
    <Table.Cell align="right">
      <DeleteButton
        onClick={useCallback(() => onClick(serial), [serial, onClick])}
      />
    </Table.Cell>
  </Table.Row>
);

Item.propTypes = {
  serial: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Item;
