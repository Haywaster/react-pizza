import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';

const Search = () => {
	const { setSearch } = useContext(SearchContext);

	const onChangeValue = e => {
		setSearch(e.target.value);
	};

	return (
		<div className={styles.root}>
			<svg className={styles.icon} viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
				<title />
				<path
					d='M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z'
					style={{ fill: 'none', stroke: '#000', strokeMiterlimit: '10', strokeWidth: '32px' }}
				/>
				<line
					style={{
						fill: 'none',
						stroke: '#000',
						strokeLinecap: 'round',
						strokeMiterlimit: '10',
						strokeWidth: '32px'
					}}
					x1='338.29'
					x2='448'
					y1='338.29'
					y2='448'
				/>
			</svg>
			<input
				onChange={onChangeValue}
				type='search'
				placeholder='Поиск пиццы...'
				className={styles.input}
			/>
		</div>
	);
};

export default Search;
