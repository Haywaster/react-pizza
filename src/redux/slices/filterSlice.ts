import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFilterState } from '../../@types/types';

const initialState: IFilterState = {
	search: '',
	categoryId: 0,
	currentPage: 1,
	sortType: { name: 'популярности', sortProperty: 'rating' }
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

export const selectFilter = (state: RootState) => state.filter;

export const { setCategory, setSortType, setCurrentPage, setFilters, setSearch } =
	filterSlice.actions;

export default filterSlice.reducer;
