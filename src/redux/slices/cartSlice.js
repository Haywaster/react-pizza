import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	itemsCount: 0,
	totalPrice: 0,
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find(item => item.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			}

			if (!findItem) {
				state.items.push(action.payload);
			}

			state.totalPrice = state.items.reduce((acc, curr) => curr.count * curr.price + acc, 0);
			state.itemsCount = state.items.reduce((sum, item) => sum + item.count, 0);
		},
		removeItem(state, action) {
			const findItem = state.items.find(item => item.id === action.payload);

			state.totalPrice = state.totalPrice - findItem.price * findItem.count;
			state.itemsCount = state.itemsCount - findItem.count;

			state.items = state.items.filter(item => item.id !== action.payload);
		},
		removeItems(state) {
			state.items = [];
			state.totalPrice = 0;
			state.itemsCount = 0;
		},
		changeCount(state, action) {
			const [id, operation] = action.payload;
			const findItem = state.items.find(item => item.id === id);

			switch (operation) {
				case 'increase':
					findItem.count++;
					state.totalPrice = state.totalPrice + findItem.price;
					state.itemsCount = state.itemsCount + 1;
					break;
				case 'decrease':
					if (findItem.count > 1) {
						findItem.count--;
						state.totalPrice = state.totalPrice - findItem.price;
						state.itemsCount = state.itemsCount - 1;
					}
					break;
			}
		}
	}
});

export const { addItem, removeItem, removeItems, changeCount } = cartSlice.actions;

export default cartSlice.reducer;
