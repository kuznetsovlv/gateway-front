import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Button from '../Button';
import styles from './AddButton.module.scss';

const AddButton = memo(({ className, disabled, to, text }) => (
  <Button
    className={clsx(styles.root, className)}
    disabled={disabled}
    link={to}
    type="add"
  >
    <span className={styles.plus}>+</span>{' '}
    <span className={styles.text}>{text}</span>
  </Button>
));

AddButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  to: PropTypes.string.isRequired,
  text: PropTypes.string
};

AddButton.defaultProps = { className: null, disabled: false, text: null };

export default AddButton;
