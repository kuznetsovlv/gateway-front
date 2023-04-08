import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './DeleteButton.module.scss';

const DeleteButton = ({ onClick }) => (
  <input
    className={styles.root}
    type="button"
    value="-"
    onClick={useCallback(
      event => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      },
      [onClick]
    )}
  />
);

DeleteButton.propTypes = { onClick: PropTypes.func.isRequired };

export default DeleteButton;
