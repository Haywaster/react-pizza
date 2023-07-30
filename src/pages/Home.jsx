import axios from 'axios';
import qs from 'qs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort, { filtersList } from '../components/Sort';

import { setFilters } from '../redux/slices/filterSlice';

const url = 'https://64a2d760b45881cc0ae5c89c.mockapi.io/pizza';

const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();
	let [searchParams] = useSearchParams();

	const { categoryId, sortType, currentPage } = useSelector(state => state.filter);
	const dispatch = useDispatch();

	const { search } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const isMounted = useRef(false);
	const isSearch = useRef(false);

	const fetchPizzas = () => {
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
	};

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				categoryId,
				sortProperty: sortType.sortProperty,
				currentPage
			});
			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoryId, sortType.sortProperty, currentPage]);

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;
		// window.scrollTo(0, 0);
	}, [categoryId, sortType.sortProperty, currentPage, search]);

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
	useEffect(() => {
		if (location.search) {
			const params = Object.fromEntries([...searchParams]);
			const sortType = filtersList.find(item => item.sortProperty === params.sortProperty);

			dispatch(setFilters({ ...params, sortType }));
			isSearch.current = true;
		}
	}, []);

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
