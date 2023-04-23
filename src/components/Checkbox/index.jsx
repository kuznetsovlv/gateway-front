import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Chaeckbox.module.scss';

const Checkbox = memo(({ className, checked, disabled, name, onChange }) => (
  <input
    className={clsx(styles.root, className)}
    checked={checked}
    disabled={disabled}
    name={name}
    type="checkbox"
    onChange={useCallback(
      ({ target: { checked } }) => onChange(checked, name),
      [onChange, name]
    )}
  />
));

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
};

Checkbox.defaultProps = {
  className: null,
  checked: false,
  disabled: false,
  name: null
};

export default Checkbox;
