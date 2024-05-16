import { createSlice } from '@reduxjs/toolkit'
import { arr } from '../../constants'

const initialState = {
	rightColumnState: [],
	leftColumnState: arr,
}

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		actionsWithList: (state, action) => {
			const { indexList, key, value } = action.payload

			if (key === 'isChecked') {
				state.leftColumnState[indexList][key] = value
				state.leftColumnState[indexList].itemArr = state.leftColumnState[
					indexList
				].itemArr.map(elem => ({
					...elem,
					isChecked: value,
				}))
			} else {
				state.leftColumnState[indexList][key] = value
			}
		},
		actionsWithItemsRightColumn: (state, action) => {
			const { indexList, id } = action.payload
			state.rightColumnState[indexList].itemArr = state.rightColumnState[
				indexList
			].itemArr.map(elem => {
				if (elem.id === id) {
					return {
						...elem,
						count: elem.count - 1,
					}
				}
				return elem
			})
		},

		actionsWithItemsLeftColumn: (state, action) => {
			const { indexList, id, key, value } = action.payload
			state.leftColumnState[indexList].itemArr = state.leftColumnState[
				indexList
			].itemArr.map(elem => {
				if (key === 'isChecked') {
					if (elem.id === id) {
						return {
							...elem,
							isChecked: value,
						}
					}
				}
				return elem
			})

			const checkForList = state.leftColumnState[indexList].itemArr.every(
				item => Boolean(item.isChecked)
			)

			if (checkForList) {
				state.leftColumnState[indexList].isChecked = true
			} else {
				state.leftColumnState[indexList].isChecked = false
			}
		},
		changeFieldsItem: (state, action) => {
			const { index, id, color, name } = action.payload

			state.leftColumnState[index].itemArr = state.leftColumnState[
				index
			].itemArr.map(elem => {
				if (elem.id === id) {
					return {
						...elem,
						color,
						name,
					}
				}
				return elem
			})
		},
		setRightColumnState: (state, action) => {
			state.rightColumnState = action.payload
		},
	},
})

export const {
	actionsWithList,
	actionsWithItemsRightColumn,
	actionsWithItemsLeftColumn,
	changeFieldsItem,
	setRightColumnState,
} = mainSlice.actions

export default mainSlice.reducer
