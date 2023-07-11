import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = ({ activeIndex, onChangeCategory }) => {
	return (
		<div className='categories'>
			<ul>
				{categories.map((elem, index) => (
					<li
						className={activeIndex === index ? 'active' : ''}
						key={index}
						onClick={() => onChangeCategory(index)}
					>
						{elem}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
