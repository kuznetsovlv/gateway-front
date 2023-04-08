import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Body.module.scss';

const Body = ({ className, children }) => (
  <div className={clsx(styles.root, className)}>{children}</div>
);

Body.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Body.defaultProps = { className: null };

export default Body;
