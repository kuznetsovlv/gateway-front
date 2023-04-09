import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Button.module.scss';

const Button = memo(({ className, children, link, type, onClick }) => {
  className = clsx(
    styles.root,
    { [styles.add]: type === 'add', [styles.normal]: type === 'normal' },
    className
  );

  return link ? (
    <Link className={clsx(styles.root, className)} to={link} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <button
      className={className}
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  link: PropTypes.string,
  type: 'normal' | 'delete' | 'submit' | 'add',
  onClick: PropTypes.func
};

Button.defaultProps = {
  className: null,
  children: null,
  link: null,
  type: 'normal',
  onClick: null
};

export default Button;
