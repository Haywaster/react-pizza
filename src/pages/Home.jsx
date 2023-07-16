import React, { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort';

const url = 'https://64a2d760b45881cc0ae5c89c.mockapi.io/pizza';

const Home = () => {
	const { categoryId, sortType } = useSelector(state => state.filter);

	const { search } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		setIsLoading(true);

		const categoryURL = categoryId ? `&category=${categoryId}` : '';
		const searchURL = search ? `&search=${search}` : '';
		const pageURL = pageNumber ? `&page=${pageNumber}` : '';
		const limitURL = '&limit=4';
		const orderURL = sortType.sortProperty ? `&orderBy=${sortType.sortProperty}` : '';

		fetch(`${url}?${pageURL}${limitURL}${searchURL}${categoryURL}${orderURL}`)
			.then(res => res.json())
			.then(json => {
				setItems(json);
				setIsLoading(false);
			});

		// window.scrollTo(0, 0);
	}, [categoryId, sortType, pageNumber, search]);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
					: items.map((elem, index) => <PizzaBlock key={elem.id} {...elem} index={index} />)}
			</div>
			<Pagination setPageNumber={setPageNumber} />
		</div>
	);
};

export default Home;
