import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://64a2d760b45881cc0ae5c89c.mockapi.io/pizza';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasItems', async params => {
	const { categoryURL, searchURL, pageURL, limitURL, orderURL } = params;
	const { data } = await axios(`${url}?${pageURL}${limitURL}${searchURL}${categoryURL}${orderURL}`);
	return data;
});

const initialState = {
	status: '', // loading | success| error
	items: []
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	extraReducers: {
		[fetchPizzas.pending]: state => {
			state.status = 'loading';
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.status = 'success';
			state.items = action.payload;
		},
		[fetchPizzas.rejected]: state => {
			state.status = 'error';
			state.items = [];
		}
	}
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
