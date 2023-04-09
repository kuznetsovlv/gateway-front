import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Row from '../Row';
import styles from './Header.module.scss';

const Header = memo(({ className, children }) => (
  <div className={clsx(styles.root, className)}>
    <Row>{children}</Row>
  </div>
));

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Header.defaultProps = { className: null };

export default Header;
