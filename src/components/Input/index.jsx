import React, { useState, useCallback, useMemo, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Input.module.scss';

/**
 * @param {string} [str]
 * @return {{valid: boolean}|{valid: boolean, message: string}}
 */
const requiredValidator = str =>
  str ? { valid: true } : { valid: false, message: 'Field is required' };

/**
 * @param {string} [str]
 * @param {function[]} validators
 * @return {{valid: boolean}|{valid: boolean, message: string}}
 */
const validate = (str, validators) => {
  for (const validator of validators) {
    const { valid, message } = validator(str);

    if (!valid) {
      return { valid, message };
    }
  }

  return { valid: true };
};

const Input = memo(
  ({
    className,
    label,
    name,
    disabled,
    required,
    value,
    placeholder,
    validators,
    onChange
  }) => {
    const [{ valid, message = null }, setValid] = useState({
      valid: true
    });
    const fullValidators = useMemo(
      () => (required ? [requiredValidator, ...validators] : validators),
      [...validators, required]
    );

    useEffect(() => setValid({ valid: true }), [value]);

    return (
      <div className={clsx(styles.root, className)}>
        <div className={clsx(styles.label, { [styles.required]: required })}>
          {label}
        </div>
        <input
          className={clsx(styles.input, { [styles.error]: !valid })}
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={useCallback(
            ({ target: { value } }) => {
              setValid({ valid: true });
              onChange(value, { name, ...validate(value, fullValidators) });
            },
            [fullValidators, name, onChange]
          )}
          onBlur={useCallback(() => {
            const res = validate(value, fullValidators);
            setValid(res);
            if (!res.valid) {
              onChange(value, { name, ...res });
            }
          }, [value, name, fullValidators, onChange])}
        />
        <div className={clsx(styles.errorMessage)} title={message}>
          {message}
        </div>
      </div>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  validators: PropTypes.arrayOf(PropTypes.func),
  onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
  className: null,
  label: null,
  name: null,
  value: '',
  placeholder: '',
  required: false,
  disabled: false,
  validators: []
};

export default Input;
