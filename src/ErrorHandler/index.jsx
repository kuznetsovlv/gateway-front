import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { v4 } from 'uuid';

import ErrorItem from './ErrorItem';
import styles from './ErrorHandle.module.scss';

const MAX_SIZE = 10;

class ErrorProcessor {
  /**
   * @private
   * @type {Map<string, string>}
   */
  $errorMap = new Map();

  /**
   * @private
   * @type {string[]}
   */
  $order = [];

  constructor() {
    makeAutoObservable(this);

    this.putError = this.putError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  /**
   * @public
   * @param {Error} error
   */
  putError(error) {
    const uuid = v4();
    this.$order.push(uuid);
    this.$errorMap.set(uuid, error.message);

    while (this.$order.length > MAX_SIZE) {
      const uuidToDel = this.$order.shift();
      this.$errorMap.delete(uuidToDel);
    }
  }

  /**
   * @public
   * @param uuid
   */
  removeError(uuid) {
    const index = this.$order.indexOf(uuid);
    if (index >= 0) {
      this.$order.splice(index, 1);
      this.$errorMap.delete(uuid);
    }
  }

  /**
   * @public
   * @return {{id: string, text: string}[]}
   */
  get list() {
    return this.$order.map(uuid => ({
      id: uuid,
      text: this.$errorMap.get(uuid)
    }));
  }
}

const errorProcessor = new ErrorProcessor();

const ErrorContext = createContext();

export const useErrorProcessor = () => useContext(ErrorContext);

const ErrorHandler = observer(({ children }) => (
  <ErrorContext.Provider value={errorProcessor}>
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
  </ErrorContext.Provider>
));

ErrorHandler.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorHandler;
