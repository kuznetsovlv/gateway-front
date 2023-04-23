import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Device, Switcher } from 'components';
import { DeviceStore } from '../../../store';
import styles from './DeviceEditor.module.scss';

const DeviceEditor = observer(({ data }) => {
  const [enabled, setEnabled] = useState(!data.uid);
  const disabled = !enabled;

  return (
    <>
      {!!data.uid && (
        <Switcher
          className={styles.switcher}
          checked={enabled}
          onLabel="Edit"
          onChange={setEnabled}
        />
      )}
      <Device
        uid={data.uid}
        vendor={data.vendor}
        status={data.status}
        dateCreated={data.dateCreated}
        disabled={disabled}
        onVendorChange={useCallback(vendor => (data.vendor = vendor), [data])}
        onStatusChange={useCallback(status => (data.status = status), [data])}
      />
    </>
  );
});

DeviceEditor.propTypes = { data: PropTypes.instanceOf(DeviceStore).isRequired };

export default DeviceEditor;
