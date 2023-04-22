import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Icon from 'icon';
import Button from '../Button';
import styles from './CloseButton.module.scss';

const CloseButton = ({ className, type, disabled, ...props }) => (
  <Button
    {...props}
    className={clsx(
      styles.root,
      {
        [styles.delete]: !disabled && type === 'delete',
        [styles.disabled]: disabled
      },
      className
    )}
    type={type}
    disabled={disabled}
    circled
  >
    <Icon name="cross" disabled={disabled} type={type} />
  </Button>
);

CloseButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  link: PropTypes.string,
  type: PropTypes.oneOf(['normal', 'delete', 'submit', 'add', 'ghost']),
  onClick: PropTypes.func
};

CloseButton.defaultProps = {
  className: null,
  disabled: false,
  link: null,
  type: 'ghost',
  onClick: null
};

export default CloseButton;
