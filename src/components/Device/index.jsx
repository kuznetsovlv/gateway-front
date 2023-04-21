import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { format, fromUnixTime } from 'date-fns';

import { doNothing } from 'utils';
import Input from '../Input';
import Switcher from '../Switcher';
import styles from './Device.module.scss';

const Device = ({
  uid,
  vendor,
  dateCreated,
  disabled,
  status,
  onVendorChange,
  onStatusChange
}) => (
  <>
    <Switcher
      className={styles.status}
      checked={status === 'online'}
      disabled={disabled}
      onLabel="online"
      offLabel="offline"
      onChange={useCallback(
        checked => onStatusChange(checked ? 'online' : 'offline'),
        []
      )}
    />
    {uid && <Input label="uid" disabled value={uid} onChange={doNothing} />}
    <Input
      label="vendor"
      disabled={disabled}
      value={vendor}
      required
      placeholder="Enter device's vendor"
      onChange={onVendorChange}
    />
    {dateCreated && (
      <Input
        label="Created"
        disabled
        value={format(fromUnixTime(this.$dateCreated), 'yyyy-MMM-dd HH:mm:ss')}
        onChange={doNothing}
      />
    )}
  </>
);

Device.propTypes = {
  uid: PropTypes.number,
  vendor: PropTypes.string,
  dateCreated: PropTypes.number,
  disabled: PropTypes.bool,
  status: PropTypes.oneOf(['online', 'offline']),
  onVendorChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired
};

Device.defaultProps = {
  uid: null,
  vendor: '',
  dateCreated: null,
  disabled: false,
  status: 'offline'
};

export default Device;
