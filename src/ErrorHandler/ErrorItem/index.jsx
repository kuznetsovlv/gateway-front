import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { CloseButton } from 'components';
import styles from './ErrorItem.module.scss';

const ErrorItem = memo(({ id, children, onDelete }) => (
  <div className={styles.root}>
    <div className={styles.message} title={children}>
      {children}
    </div>
    <CloseButton type="delete" onClick={() => onDelete(id)} />
  </div>
));

ErrorItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ErrorItem;
