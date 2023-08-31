import qs from 'qs';
import React, { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort, { filtersList } from '../components/Sort';

import { selectFilter, setFilters } from '../redux/slices/filterSlice';
import PizzaBlock from '../components/PizzaBlock';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { AppDispatch } from '../redux/store';

const Home: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	let [searchParams] = useSearchParams();
	
	const { items, status } = useSelector(selectPizzaData);
	const { categoryId, sortType, currentPage, search } = useSelector(selectFilter);
	const dispatch = useDispatch<AppDispatch>();
	
	const isMounted = useRef(false);
	const isSearch = useRef(false);
	
	const getPizzas = async () => {
		const categoryURL = categoryId ? `&category=${ categoryId }` : '';
		const searchURL = search ? `&search=${ search }` : '';
		const pageURL = currentPage ? `&page=${ currentPage }` : '';
		const limitURL = '&limit=4';
		const orderURL = sortType.sortProperty ? `&orderBy=${ sortType.sortProperty }` : '';
		
		dispatch(fetchPizzas({ categoryURL, searchURL, pageURL, limitURL, orderURL }));
	};
	
	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				categoryId,
				sortProperty: sortType.sortProperty,
				currentPage
			});
			navigate(`?${ queryString }`);
		}
		
		isMounted.current = true;
	}, [categoryId, sortType.sortProperty, currentPage]);
	
	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
		// window.scrollTo(0, 0);
	}, [categoryId, sortType.sortProperty, currentPage, search]);
	
	// Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
	useEffect(() => {
		if (location.search) {
			const params = Object.fromEntries([...searchParams]);
			const sortType = filtersList.find(item => item.sortProperty === params['sortProperty']);
			
			dispatch(setFilters({ ...params, sortType }));
			isSearch.current = true;
		}
	}, []);
	
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories/>
				<Sort/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{ status === 'error' ? (
				<div className='content__error-getting'>
					<h2>
						Упс, ошибочка 😕
					</h2>
					<p>Не удалось получить питсы. Попробуйте немного позже.</p>
				</div>
			) : status === 'loading' ? (
				<div className='content__items'>
					{ [...new Array(6)].map((_, index) => (
						<Sceleton key={ index }/>
					)) }
				</div>
			) : (
				<div className='content__items'>
					{ items.map((elem) => (
						<PizzaBlock key={ elem.id } { ...elem } />
					)) }
				</div>
			) }
			<Pagination/>
		</div>
	);
};

export default Home;
