import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sortType: { name: 'популярности', sortProperty: 'rating' },
	currentPage: 1
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory(state, action) {
			state.categoryId = action.payload;
		},
		setSortType(state, action) {
			state.sortType = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		}
	}
});

export const { setCategory, setSortType, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
