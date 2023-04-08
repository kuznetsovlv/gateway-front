import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Table, Page } from 'components';
import Item from './Item';
import GateWaysStore from './GateWaysStore';

const Main = observer(({ data }) => {
  useEffect(() => {
    data.fetchData();
  }, []);

  return (
    <Page title="Gateways" loading={data.loading}>
      <Table>
        <Table.Header>
          <Table.Cell align="center">Name</Table.Cell>
          <Table.Cell align="center">Serial</Table.Cell>
          <Table.Cell />
        </Table.Header>
        <Table.Body>
          {data.list.map(({ serial, name }) => (
            <Item
              key={serial}
              serial={serial}
              name={name}
              onClick={data.delete}
            />
          ))}
        </Table.Body>
      </Table>
    </Page>
  );
});

Main.propTypes = {
  data: PropTypes.instanceOf(GateWaysStore).isRequired
};

export default Main;
