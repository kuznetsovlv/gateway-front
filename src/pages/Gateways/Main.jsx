import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { GATEWAY_ROUTE } from 'routes';
import { Table, Page, AddButton, Modal, Button } from 'components';
import Item from './Item';
import GateWaysStore from './GateWaysStore';

const Main = observer(({ data }) => {
  const [{ serial, name, open }, setConfirmation] = useState({ open: false });
  useEffect(() => {
    data.fetchData();
  }, []);

  const handleCloseConfirmation = useCallback(
    () => setConfirmation({ open: false }),
    []
  );
  const handleDeleteGateWay = useCallback(() => {
    data.delete(serial);
    handleCloseConfirmation();
  }, [data, serial]);

  return (
    <>
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
                onClick={setConfirmation}
              />
            ))}
          </Table.Body>
        </Table>
        <AddButton to={GATEWAY_ROUTE} text="Create new gateway" />
      </Page>
      <Modal
        open={open}
        title="Delete Gateway Conversation"
        actions={[
          <Button key="delete" type="delete" onClick={handleDeleteGateWay}>
            Delete
          </Button>,
          <Button key="cancel" type="normal" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
        ]}
        onClose={handleCloseConfirmation}
      >
        <p>
          Do you really want to delete gateway {name}({serial})?
        </p>
      </Modal>
    </>
  );
});

Main.propTypes = {
  data: PropTypes.instanceOf(GateWaysStore).isRequired
};

export default Main;
