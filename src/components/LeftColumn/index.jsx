import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import {
	actionsWithItemsLeftColumn,
	actionsWithList,
	changeFieldsItem,
} from '../../redux/slices/mainSlice'
import { Modal } from '../Modal'
import { CustomInput } from '../../ui/CustomInput'
import { Button } from '../../ui/Button'
import { CustomCheckbox } from '../../ui/CustomCheckbox'
import styles from './LeftColumn.module.css'

export const LeftColumn = ({ lists }) => {
	const [isModalOpen, setModalOpen] = useState(false)
	const [valueItem, setValueItem] = useState({
		name: '',
		color: '#fff',
	})

	const [tempState, setTempState] = useState()
	const dispatch = useDispatch()
	const showHadler = (index, value) => {
		dispatch(
			actionsWithList({
				indexList: index,
				key: 'isShow',
				value: !value,
			})
		)
	}

	const checkedHandler = (e, index, value, name, id) => {
		e.stopPropagation()
		if (name === 'item') {
			dispatch(
				actionsWithItemsLeftColumn({
					indexList: index,
					key: 'isChecked',
					value: !value,
					id,
				})
			)
		} else {
			dispatch(
				actionsWithList({
					indexList: index,
					key: 'isChecked',
					value: !value,
				})
			)
		}
	}

	const openModal = (e, index, value, id) => {
		e.stopPropagation()
		setModalOpen(true)
		setTempState({ index, value, id })
	}
	const closeModal = () => setModalOpen(false)

	const saveValue = () => {
		const isHaveColor = lists.some(elem =>
			elem.itemArr.some(item => item.color === valueItem.color)
		)

		if (isHaveColor) {
			alert('Такой цвет уже присутствует')
		} else {
			const { index, id } = tempState
			dispatch(
				changeFieldsItem({
					index,
					id,
					color: valueItem.color,
					name: valueItem.name,
				})
			)
			setModalOpen(false)
			setValueItem({
				name: '',
				color: '',
			})
		}
	}

	const handlerInput = (e, name) => {
		setValueItem(prev => ({ ...prev, [name]: e.target.value }))
	}
	return (
		<div className={styles.root}>
			{lists.map((elem, index) => (
				<div
					onClick={() => showHadler(index, elem.isShow)}
					className={styles.block}
					key={elem.id}
				>
					<div className={styles.list}>
						<div className={elem.isShow ? styles.arrow : ''}>&#9660;</div>
						<CustomCheckbox
							isChecked={elem.isChecked}
							onChange={e =>
								checkedHandler(e, index, elem.isChecked, 'list', elem.id)
							}
						/>
						<p>List {elem.id}</p>
					</div>
					{elem.isShow && (
						<div className={styles.blockItem}>
							{elem.itemArr.map((item, i) => (
								<div
									className={styles.item}
									onClick={e => openModal(e, index, item.name, item.id)}
									key={item.id}
								>
									<div
										style={{ display: 'flex', gap: 10, alignItems: 'center' }}
									>
										<CustomCheckbox
											isChecked={item.isChecked}
											onChange={e => {
												checkedHandler(
													e,
													index,
													item.isChecked,
													'item',
													item.id
												)
											}}
										/>
										<p>{item.name}</p>
									</div>
									<div className={styles.blockSquare}>
										<p>{item.count}</p>
										<div
											style={{ background: item.color, width: 20, height: 20 }}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			))}
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<b>Редактирование</b>
				<CustomInput
					value={valueItem.name}
					onChange={e => handlerInput(e, 'name')}
					// handleBlur={() => console.log('first')}
				/>
				<input
					style={{ display: 'block', marginBottom: 20 }}
					type="color"
					value={valueItem.color}
					onChange={e => handlerInput(e, 'color')}
				/>
				<Button onClick={saveValue} disabled={!valueItem.name} />
			</Modal>
		</div>
	)
}
