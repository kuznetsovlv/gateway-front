import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Button from '../Button';
import styles from './AddLink.module.scss';

const AddLink = memo(({ className, to, text }) => (
  <Button className={clsx(styles.root, className)} link={to} type="add">
    <span className={styles.plus}>+</span>{' '}
    <span className={styles.text}>{text}</span>
  </Button>
));

AddLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  text: PropTypes.string
};

AddLink.defaultProps = { className: null, text: null };

export default AddLink;
