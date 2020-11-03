import React from 'react';

import { BrowserRouter as Router,  Switch, Route, useLocation} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

// Pages components
import Register from './views/Register';
import Login from './views/Login';
import Movies from './views/Movies';
import MyMovies from './views/MyMovies';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

//Container
import ProtectedRoute from './containers/ProtectedRoute';

// General styles
import 'normalize.css';
import './general.scss';

//FontAwesome config
import { library } from '@fortawesome/fontawesome-svg-core';
import {faUser, faKey, faTimes, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faKey, faTimes, faSignOutAlt);

import Cookie from 'js-cookie';
import store from './redux/store';
import {login as loginAction} from './redux/actions';

// Check if exist a cookie session and change the state
const session = Cookie.getJSON('session');
if(session != null && session.token != null){
	store.dispatch(loginAction({
		token: session.token,
		username: session.username,
		id: session.id
	}))
}

const routes = [
	{path: '/', Component: Movies, isProtected: true},
	{path: '/mymovies', Component: MyMovies, isProtected: true},
	{path: '/signup', Component: Register, isProtected: false},
	{path: '/login', Component: Login, isProtected: false}
]

const App = () => {
	return(
		<Router>
			<div className="app-container">
				<Header/>
					<main className="main-content">
						{
							routes.map(({path, Component, isProtected}) => (
								<Route key={path} exact path={path}>
									{
										({match}) => (
											<CSSTransition
												in={match != null}
												classNames="page"
												timeout={300}
												unmountOnExit
											>
												<div className="page">
													{isProtected ? <ProtectedRoute Component={Component}/> : <Component/>}
												</div>
											</CSSTransition>
										)
									}	
								</Route>	
							))
						}
					</main>
				<Footer/>
			</div>
		</Router>
	);
};


export default App;