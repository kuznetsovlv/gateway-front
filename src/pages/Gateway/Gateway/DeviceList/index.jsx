import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Modal, Button } from 'components';
import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';
import DeviceListStore from './DeviceListStore';

const DeviceList = observer(({ open, bound, onClose, onSave }) => {
  const store = useStore();
  const dataRef = useRef(
    new DeviceListStore({
      bound,
      errorProcessor: store.get(ERROR_PROCESSOR_KEY)
    })
  );

  const data = dataRef.current;

  return (
    <Modal
      loading={data.loading}
      open={open}
      title="Device list"
      actions={[
        <Button
          key="apply"
          type="submit"
          disabled={data.saveDisabled}
          onClick={useCallback(() => {
            onSave(data.selected);
            onClose();
          }, [data])}
        >
          Apply
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>
      ]}
      onClose={onClose}
    >
      List
    </Modal>
  );
});

DeviceList.propTypes = {
  open: PropTypes.bool,
  bound: PropTypes.arrayOf(PropTypes.number).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

DeviceList.defaultProps = { open: false };

export default DeviceList;
