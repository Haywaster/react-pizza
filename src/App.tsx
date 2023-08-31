import React, { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import './scss/app.scss';

function App(): JSX.Element {
	return (
		<div className='App'>
			<div className='wrapper'>
				<Header/>
				<div className='content'>
					<Routes>
						<Route path='/' element={ <Home/> }/>
						<Route path='/cart' element={ <Cart/> }/>
						<Route path='/pizza/:id' element={ <FullPizza/> }/>
						<Route path='*' element={ <NotFound/> }/>
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
