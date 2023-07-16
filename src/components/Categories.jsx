import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = () => {
	const activeCategory = useSelector(state => state.filter.categoryId);
	const dispatch = useDispatch();

	return (
		<div className='categories'>
			<ul>
				{categories.map((elem, index) => (
					<li
						className={activeCategory === index ? 'active' : ''}
						key={index}
						onClick={() => dispatch(setCategory(index))}
					>
						{elem}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
