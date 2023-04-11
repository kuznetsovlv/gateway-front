import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader';
import styles from './Lazy.module.scss';

const Lazy = ({ children }) => (
  <Suspense
    fallback={
      <div className={styles.loader}>
        <Loader />
      </div>
    }
  >
    {children}
  </Suspense>
);

Lazy.propTypes = {
  children: PropTypes.node.isRequired
};

export default Lazy;
