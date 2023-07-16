import React, { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { SearchContext } from '../App';

import axios from 'axios';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort';

const url = 'https://64a2d760b45881cc0ae5c89c.mockapi.io/pizza';

const Home = () => {
	const { categoryId, sortType, currentPage } = useSelector(state => state.filter);
	const { search } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		const categoryURL = categoryId ? `&category=${categoryId}` : '';
		const searchURL = search ? `&search=${search}` : '';
		const pageURL = currentPage ? `&page=${currentPage}` : '';
		const limitURL = '&limit=4';
		const orderURL = sortType.sortProperty ? `&orderBy=${sortType.sortProperty}` : '';

		axios(`${url}?${pageURL}${limitURL}${searchURL}${categoryURL}${orderURL}`).then(response => {
			setItems(response.data);
			setIsLoading(false);
		});

		// window.scrollTo(0, 0);
	}, [categoryId, sortType, currentPage, search]);

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
			<Pagination />
		</div>
	);
};

export default Home;
