import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ setPageNumber }) => {
	const onChangePage = e => {
		setPageNumber(e.selected + 1);
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
