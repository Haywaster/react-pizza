import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategory } from '../redux/slices/filterSlice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = () => {
	const { categoryId } = useSelector(selectFilter);
	const dispatch = useDispatch();

	return (
		<div className='categories'>
			<ul>
				{ categories.map((elem, index) => (
					<li
						className={ categoryId === index ? 'active' : '' }
						key={ index }
						onClick={ () => dispatch(setCategory(index)) }
					>
						{ elem }
					</li>
				)) }
			</ul>
		</div>
	);
};

export default Categories;
