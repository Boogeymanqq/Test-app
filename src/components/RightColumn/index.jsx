import React from 'react'
import { useDispatch } from 'react-redux'
import { actionsWithItemsRightColumn } from '../../redux/slices/mainSlice'
import styles from './RightColumn.module.css'

export const RightColumn = ({ lists }) => {
	const dispatch = useDispatch()

	const deleteItem = (indexList, id) => {
		dispatch(actionsWithItemsRightColumn({ indexList, id }))
	}

	return (
		<div className={lists.length ? styles.root : ''}>
			{lists.map((elem, index) => (
				<div className={styles.block} key={elem.id}>
					<div>
						<p>List {elem.id}</p>
					</div>
					<div>
						{elem.itemArr.map((item, i) => (
							<div className={styles.itemBlock} key={item.id}>
								<div className={styles.itemBlockTitle}>
									<p>{item?.name}</p>
								</div>
								<div className={styles.item}>
									{[...Array(item.count)].map((elem, i) => (
										<div
											className={styles.square}
											onClick={() => deleteItem(index, item.id)}
											key={i}
											style={{
												background: item.color,
											}}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
