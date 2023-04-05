import React from 'react';
import PropTypes from 'prop-types';

import styles from './ErrorItem.module.scss';

const ErrorItem = ({ id, children, onDelete }) => (
  <div className={styles.root}>
    <div className={styles.message} title={children}>
      {children}
    </div>
    <div className={styles.button} onClick={() => onDelete(id)}>
      <div />
      <div />
    </div>
  </div>
);

ErrorItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ErrorItem;
