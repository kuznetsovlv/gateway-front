import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Table.module.scss';

const Table = memo(({ className, children }) => (
  <div className={clsx(styles.root, className)}>{children}</div>
));

Table.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Table.defaultProps = { className: null };

export default Table;
