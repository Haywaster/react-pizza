import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = () => (
	<ContentLoader
		className='pizza-block'
		speed={ 2 }
		width={ 250 }
		height={ 465 }
		viewBox='0 0 250 465'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'>
		<rect x='-1' y='269' rx='10' ry='10' width='250' height='20'/>
		<rect x='-1' y='310' rx='10' ry='10' width='250' height='88'/>
		<circle cx='121' cy='121' r='121'/>
		<rect x='5' y='424' rx='0' ry='0' width='87' height='32'/>
		<rect x='127' y='420' rx='25' ry='25' width='120' height='41'/>
	</ContentLoader>
);

export default Sceleton;
