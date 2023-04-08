import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './AddLink.module.scss';

const AddLink = ({ className, to, text }) => (
  <Link className={clsx(styles.root, className)} to={to}>
    <span className={styles.plus}>+</span>{' '}
    <span className={styles.text}>{text}</span>
  </Link>
);

AddLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  text: PropTypes.string
};

AddLink.defaultProps = { className: null, text: null };

export default AddLink;
