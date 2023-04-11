import React, { memo } from 'react';

import styles from './Loader.module.scss';

//Got from https://codepen.io/alphardex/pen/JjYVoqm
export default memo(() => (
  <div className={styles.loading}>
    <div className={styles.arc}></div>
    <div className={styles.arc}></div>
    <div className={styles.arc}></div>
  </div>
));
