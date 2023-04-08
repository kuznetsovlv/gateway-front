import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Table } from 'components';
import { GATEWAY_ROUTE } from 'routes';
import GateWaysStore from './GateWaysStore';

const List = observer(({ data }) => {
  useEffect(() => {
    data.fetchData();
  }, []);

  return (
    <Table>
      <Table.Header>
        <Table.Cell align="center">Header cell</Table.Cell>
        <Table.Cell align="center">Header cell</Table.Cell>
        <Table.Cell align="center">Header cell</Table.Cell>
      </Table.Header>
      <Table.Body>
        <Table.Row link={GATEWAY_ROUTE}>
          <Table.Cell align="left">Row cell</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell align="right">Row cell</Table.Cell>
        </Table.Row>
        <Table.Row link={GATEWAY_ROUTE}>
          <Table.Cell align="right">Row cell</Table.Cell>
          <Table.Cell>Row cell</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
});

List.propTypes = {
  data: PropTypes.instanceOf(GateWaysStore).isRequired
};

export default List;
