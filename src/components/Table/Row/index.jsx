import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Row.module.scss';

const Row = ({ className, children, link, title }) => {
  className = clsx(styles.root, className);

  return link ? (
    <Link className={className} to={link} title={title}>
      {children}
    </Link>
  ) : (
    <div className={className} title={title}>
      {children}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  title: PropTypes.string
};

Row.defaultProps = { className: null, link: null, title: null };

export default Row;
