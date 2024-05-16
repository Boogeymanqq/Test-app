import React from 'react'
import styles from './CustomCheckbox.module.css'

export const CustomCheckbox = ({ isChecked, onChange }) => {
	return (
		<div className={styles.checkbox} onClick={onChange}>
			{isChecked ? <>&#x2713;</> : ''}
		</div>
	)
}
