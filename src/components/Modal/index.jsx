import React from 'react'
import ReactDOM from 'react-dom';
import styles from './Modal.module.css'

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
      <div className={styles.root}onClick={onClose}>
          <div className={styles.content} onClick={e => e.stopPropagation()}>
              {children}
          </div>
      </div>,
      document.body
  );
}
