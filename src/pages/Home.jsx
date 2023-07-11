import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort';

const url = 'https://64a2d760b45881cc0ae5c89c.mockapi.io/pizza';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [category, setCategory] = useState(0);
	const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

	useEffect(() => {
		setIsLoading(true);
		const writtenCategory = category == 0 ? '' : category;

		fetch(`${url}?category=${writtenCategory}&orderBy=${sortType.sortProperty}`)
			.then(res => res.json())
			.then(json => {
				setItems(json);
				setIsLoading(false);
			});

		// window.scrollTo(0, 0);
	}, [category, sortType]);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories activeIndex={category} onChangeCategory={id => setCategory(id)} />
				<Sort sortType={sortType} setSortType={setSortType} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
					: items.map((elem, index) => <PizzaBlock key={elem.id} {...elem} index={index} />)}
			</div>
		</div>
	);
};

export default Home;
