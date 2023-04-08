import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Cell.module.scss';

const Cell = ({ className, children, align }) => (
  <div
    className={clsx(
      styles.root,
      {
        [styles.left]: align === 'left',
        [styles.center]: align === 'center',
        [styles.right]: align === 'right'
      },
      className
    )}
  >
    {children}
  </div>
);

Cell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center', 'right'])
};

Cell.defaultProps = { className: null, children: null, align: 'left' };

export default Cell;
