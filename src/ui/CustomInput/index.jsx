import React, { useState } from 'react';
import styles from './CustomInput.module.css'

export const CustomInput = ({ label, type = "text", value, onChange, placeholder, required, errorMessage, handleBlur }) => {
    const [touched, setTouched] = useState(false);

    // const handleBlur = () => {
    //     setTouched(true);
    // };

    const showError = required && touched && !value;

    return (
        <div className={styles.root}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={styles.input}
            />
            {/* {showError && <span className="error-message">{errorMessage}</span>} */}
        </div>
    );
};