import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Button.module.scss';

const Button = memo(
  ({ className, children, disabled, link, type, onClick }) => {
    className = clsx(
      styles.root,
      {
        [styles.add]: !disabled && type === 'add',
        [styles.normal]: !disabled && type === 'normal',
        [styles.submit]: !disabled && type === 'submit',
        [styles.delete]: !disabled && type === 'delete',
        [styles.disabled]: disabled
      },
      className
    );

    return link && !disabled ? (
      <Link
        className={clsx(styles.root, className)}
        to={link}
        onClick={onClick}
      >
        {children}
      </Link>
    ) : (
      <button
        className={className}
        type={type === 'submit' ? 'submit' : 'button'}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  link: PropTypes.string,
  type: 'normal' | 'delete' | 'submit' | 'add',
  onClick: PropTypes.func
};

Button.defaultProps = {
  className: null,
  children: null,
  disabled: false,
  link: null,
  type: 'normal',
  onClick: null
};

export default Button;
