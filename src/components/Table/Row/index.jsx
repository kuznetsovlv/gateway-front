import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Row.module.scss';

const Row = ({ className, children, link }) => {
  className = clsx(styles.root, className);

  return link ? (
    <Link className={className} to={link}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  link: PropTypes.string
};

Row.defaultProps = { className: null, link: null };

export default Row;
