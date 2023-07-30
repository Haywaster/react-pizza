import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cart from '../assets/img/cart.svg';
import logo from '../assets/img/pizza-logo.svg';
import Search from './Search';

const Header = () => {
	const { totalPrice, itemsCount } = useSelector(state => state.cart);

	return (
		<div className='header'>
			<div className='container'>
				<Link to='/'>
					<div className='header__logo'>
						<img width='38' src={logo} alt='Pizza logo' />
						<div>
							<h1>React Pizza</h1>
							<p>самая вкусная пицца во вселенной</p>
						</div>
					</div>
				</Link>
				<Search />
				<div className='header__cart'>
					<Link className='button button--cart' to='/cart'>
						<span>{totalPrice} ₽</span>
						<div className='button__delimiter'></div>
						<img style={{ marginRight: '7px' }} src={cart} alt='cart' />
						<span>{itemsCount}</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
