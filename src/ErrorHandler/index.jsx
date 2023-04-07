import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';
import ErrorItem from './ErrorItem';
import styles from './ErrorHandle.module.scss';

const ErrorHandler = observer(({ children }) => {
  const store = useStore();
  const errorProcessor = store.get(ERROR_PROCESSOR_KEY);

  return (
    <div className={styles.root}>
      {children}
      <div className={styles.errorBlock}>
        {errorProcessor.list.map(({ id, text }) => (
          <ErrorItem key={id} id={id} onDelete={errorProcessor.removeError}>
            {text}
          </ErrorItem>
        ))}
      </div>
    </div>
  );
});
ErrorHandler.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorHandler;
