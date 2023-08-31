import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { IPizzaMenuState, IUrlParams } from '../../@types/types';

export const url: string = 'https://64e8aa8f99cf45b15fdff6dc.mockapi.io/pizza';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasItems', async (params: IUrlParams) => {
	const { categoryURL, searchURL, pageURL, limitURL, orderURL } = params;
	const { data } = await axios(`${ url }?${ pageURL }${ limitURL }${ searchURL }${ categoryURL }${ orderURL }`);
	
	return data;
});

const initialState: IPizzaMenuState = {
	status: '', // loading | success| error
	items: []
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = 'loading';
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = 'success';
			state.items = action.payload;
		});
		builder.addCase(fetchPizzas.rejected, state => {
			state.status = 'error';
			state.items = [];
		});
	}
});

export const selectPizzaData = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
