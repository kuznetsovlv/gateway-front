import React from 'react';
import PropTypes from 'prop-types';

import { CloseButton } from 'components';
import styles from './Modal.module.scss';

const blockPropagation = event => event.stopPropagation();

const Modal = ({ actions, children, open, title, onClose }) =>
  open ? (
    <div className={styles.root} onClick={onClose}>
      <div className={styles.window} onClick={blockPropagation}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <CloseButton onClick={onClose} />
        </header>
        <main className={styles.main}>{children}</main>
        {!!actions.length && (
          <footer className={styles.footer}>{actions}</footer>
        )}
      </div>
    </div>
  ) : null;

Modal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node).isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

Modal.dfaultProps = { title: null };

export default Modal;
