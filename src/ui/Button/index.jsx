import React from 'react';
import styles from './Button.module.css'

export const Button = ({ onClick, className = '', disabled = false }) => {
    return (
        <button
            className={`${styles.root} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            Сохранить
        </button>
    );
};