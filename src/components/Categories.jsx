import React, { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = index => {
    setActiveIndex(index);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((elem, index) => (
          <li
            className={activeIndex === index ? 'active' : ''}
            key={index}
            onClick={() => onClickCategory(index)}>
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
