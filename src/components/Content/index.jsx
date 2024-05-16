import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRightColumnState } from '../../redux/slices/mainSlice'
import { LeftColumn } from '../LeftColumn'
import { RightColumn } from '../RightColumn'
import styles from './Content.module.css'

export const Content = () => {
	const { leftColumnState, rightColumnState } = useSelector(
		state => state.mainSlice
	)

	const dispatch = useDispatch()

	useEffect(() => {
		const isHaveCheckArr = leftColumnState
			.map(column => {
				const filteredItemArr = column.itemArr.filter(item => item.isChecked)
				return filteredItemArr.length > 0
					? { ...column, itemArr: filteredItemArr }
					: null
			})
			.filter(Boolean)

		dispatch(setRightColumnState(isHaveCheckArr))
	}, [leftColumnState])

	return (
		<div className={styles.root}>
			<LeftColumn lists={leftColumnState} />
			<RightColumn lists={rightColumnState} />
		</div>
	)
}
