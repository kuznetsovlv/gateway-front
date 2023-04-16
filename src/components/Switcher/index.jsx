import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { v4 } from 'uuid';

import styles from './Switcher.module.scss';

const Switcher = ({ className, checked, onLabel, offLabel, onChange }) => {
  const id = useRef(v4());

  return (
    <>
      <input
        className={styles.input}
        name={id.current}
        id={id.current}
        type="checkbox"
        checked={checked}
        onChange={useCallback(
          ({ target: { checked } }) => onChange(!checked),
          [onChange]
        )}
      />
      <label
        htmlFor={id.current}
        className={clsx(
          styles.label,
          { [styles.checked]: checked, [styles.unchecked]: !checked },
          className
        )}
      >
        <div className={styles.text}>{checked ? onLabel : offLabel}</div>
        <div className={styles.key} />
      </label>
    </>
  );
};

Switcher.ptopTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Switcher.defaultProps = {
  className: null,
  checked: false,
  onLabel: null,
  offLabel: null
};

export default Switcher;
