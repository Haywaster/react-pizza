import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';

const Pagination = () => {
	const dispatch = useDispatch();

	const onChangePage = e => {
		dispatch(setCurrentPage(e.selected + 1));
	};

	return (
		<ReactPaginate
			className={styles.root}
			breakLabel='...'
			nextLabel='>'
			onPageChange={onChangePage}
			pageRangeDisplayed={8}
			pageCount={3}
			previousLabel='<'
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
