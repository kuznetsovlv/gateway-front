import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import CloseButton from '../CloseButton';
import Loader from '../Loader';
import styles from './Modal.module.scss';

const blockPropagation = event => event.stopPropagation();

const Modal = ({ actions, children, open, loading, title, zIndex, onClose }) =>
  open ? (
    <div className={styles.root} style={{ zIndex }} onClick={onClose}>
      <div className={styles.window} onClick={blockPropagation}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <CloseButton onClick={onClose} />
        </header>
        <main className={clsx(styles.main, { [styles.loading]: loading })}>
          {loading ? <Loader /> : children}
        </main>
        {!loading && !!actions.length && (
          <footer className={styles.footer}>{actions}</footer>
        )}
      </div>
    </div>
  ) : null;

Modal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node).isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  zIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired
};

Modal.dfaultProps = { title: null };

export default Modal;
