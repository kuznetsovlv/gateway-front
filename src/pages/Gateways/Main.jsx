import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Table, Page } from 'components';
import { GATEWAY_ROUTE } from 'routes';
import GateWaysStore from './GateWaysStore';

const Main = observer(({ data }) => {
  useEffect(() => {
    data.fetchData();
  }, []);

  return (
    <Page title="Gateways" loading={data.loading}>
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
    </Page>
  );
});

Main.propTypes = {
  data: PropTypes.instanceOf(GateWaysStore).isRequired
};

export default Main;
