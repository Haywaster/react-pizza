import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	search: '',
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
		setSearch(state, action) {
			state.search = action.payload;
		},
		setSortType(state, action) {
			state.sortType = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setFilters(state, action) {
			state.sortType = action.payload.sortType;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		}
	}
});

export const selectFilter = state => state.filter;

export const { setCategory, setSortType, setCurrentPage, setFilters, setSearch } =
	filterSlice.actions;

export default filterSlice.reducer;
