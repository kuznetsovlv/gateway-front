import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Loader from '../Loader';
import styles from './Page.module.scss';

const Page = memo(({ title, children, loading }) => (
  <div className={styles.root}>
    <header className={styles.header}>
      {!!title && <h1 className={styles.title}>{title}</h1>}
    </header>
    <main className={clsx(styles.main, { [styles.loading]: loading })}>
      {loading ? <Loader /> : children}
    </main>
  </div>
));

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool
};

Page.defaultProps = { title: null, loading: false };

export default Page;
