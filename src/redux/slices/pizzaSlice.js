import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const url = 'https://64e8aa8f99cf45b15fdff6dc.mockapi.io/pizza';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasItems', async (params) => {
	const { categoryURL, searchURL, pageURL, limitURL, orderURL } = params;
	const { data } = await axios(`${ url }?${ pageURL }${ limitURL }${ searchURL }${ categoryURL }${ orderURL }`);

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

export const selectPizzaData = state => state.pizza;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
