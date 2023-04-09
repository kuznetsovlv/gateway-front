import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import styles from './DeleteButton.module.scss';

const DeleteButton = ({ onClick }) => (
  <Button
    className={styles.root}
    type="delete"
    onClick={useCallback(
      event => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      },
      [onClick]
    )}
  >
    &ndash;
  </Button>
);

DeleteButton.propTypes = { onClick: PropTypes.func.isRequired };

export default DeleteButton;
