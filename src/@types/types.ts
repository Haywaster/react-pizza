export interface ICartState {
	itemsCount: number;
	totalPrice: number;
	items: ICartItem[];
}

export interface IPizzaMenuState {
	status: string;
	items: IFullPizzaItem[];
}

export interface ICartItem {
	id: number,
	imageUrl: string,
	title: string,
	size: number,
	type: number,
	price: number,
	count: number
}

export interface IPizzaItem {
	id: number,
	imageUrl: string,
	title: string,
	price: number,
}

export interface IFullPizzaItem extends IPizzaItem {
	types: number[],
	sizes: number[],
	category: number,
	rating: number
}

export interface IUrlParams {
	categoryURL: string,
	searchURL: string,
	pageURL: string,
	limitURL: string,
	orderURL: string
}

export interface IFilterState {
	search: string,
	categoryId: number,
	currentPage: number,
	sortType: { name: string, sortProperty: string }
}