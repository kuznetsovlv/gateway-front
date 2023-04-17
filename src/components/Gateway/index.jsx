import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, IPInput } from 'components';
import styles from './Gateway.module.scss';

const Gateway = ({
  name,
  ip,
  disabled,
  saveDisabled,
  onNameChange,
  onIPChange,
  onSave
}) => (
  <>
    <Input
      label="Name"
      disabled={disabled}
      value={name}
      placeholder="Gateway's name"
      required
      onChange={onNameChange}
    />
    <IPInput
      label="IP"
      disabled={disabled}
      value={ip}
      placeholder="Gateway's ip"
      required
      onChange={onIPChange}
    />
    <Button
      className={styles.submit}
      type="submit"
      disabled={disabled || saveDisabled}
      onClick={onSave}
    >
      Save
    </Button>
  </>
);

Gateway.propTypes = {
  name: PropTypes.string,
  ip: PropTypes.number,
  disabled: PropTypes.bool,
  saveDisabled: PropTypes.bool,
  onNameChange: PropTypes.func.isRequired,
  onIPChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

Gateway.defaultProps = {
  name: null,
  ip: null,
  disabled: false,
  saveDisabled: false
};

export default Gateway;
