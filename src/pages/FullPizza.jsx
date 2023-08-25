import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from '../redux/slices/pizzaSlice.js';

const FullPizza = () => {
	const [pizza, setPizza] = useState();
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		try {
			const findPizza = async () => {
				const { data } = await axios(`${ url }/${ id }`);
				setPizza(data);
			};
			findPizza();
		} catch {
			alert('Пицца не найдена');
			navigate('');
		}
	}, []);

	if (!pizza) {
		return <p>Загрузка...</p>;
	}

	return (
		<div className='container'>
			<img src={ pizza.imageUrl } alt={ pizza.title }/>
			<h1>{ pizza.title }</h1>
			<p>Цена: { pizza.price }</p>
		</div>
	);
};

export default FullPizza;