import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sortType: { name: 'популярности', sortProperty: 'rating' }
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory(state, action) {
			console.log(action.payload);
			state.categoryId = action.payload;
		},
		setSortType(state, action) {
			state.sortType = action.payload;
		}
	}
});

export const { setCategory, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
