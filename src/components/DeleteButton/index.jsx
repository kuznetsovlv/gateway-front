import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'icon';
import Button from '../Button';
import styles from './DeleteButton.module.scss';

const DeleteButton = ({ disabled, onClick }) => (
  <Button
    className={styles.root}
    circled
    disabled={disabled}
    type="delete"
    onClick={onClick}
  >
    <Icon name="minus" disabled={disabled} type="delete" />
  </Button>
);

DeleteButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

DeleteButton.defaultProps = { disabled: false };

export default DeleteButton;
