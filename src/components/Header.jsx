import React from 'react';
import {connect} from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {logout as logoutAction} from '../redux/actions';
import Cookie from 'js-cookie';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.scss';

const linkSelected = (locationPathname, linkPathname) => {
	if(locationPathname === linkPathname){
		return ' selected';
	}
	return '';
}

const UnloggedMenu = ({location}) => (
	<ul className="header__navlist">
		<li className={'header__navlink' + linkSelected(location.pathname, '/signup')}>
			<Link to="/signup">Signup</Link>
		</li>
		<li className={'header__navlink' + linkSelected(location.pathname, '/login')}>
			<Link to="/login">Login</Link>
		</li>
	</ul>
)

const LoggedMenu = ({location, logout, username}) => (
	<ul className="header__navlist">
		<li className={'header__navlink' + linkSelected(location.pathname, '/mymovies')}>
			<Link to="/mymovies">My Movies</Link>
		</li>
		<li>
			<div className="dropdown-menu">
				<div className="dropdown-menu__text">{username}</div>
				<div className="dropdown-menu__buttons">
					<button className="dropdown-menu__button" onClick={logout}>
						<FontAwesomeIcon icon="sign-out-alt"/>
						<span>Logout</span>
					</button>
				</div>
			</div>
		</li>
	</ul>
)

const Header = ({loggedin, logoutAction, username}) => {
	const location = useLocation();

	const logout = () => {
		Cookie.remove('session');
		logoutAction();
	}

	return (
		<header className="header">
			<Link to="/"><h1 className="header__title">React Movies</h1></Link>
			<nav>
				{loggedin 
					? <LoggedMenu location={location} logout={logout} username={username}/> 
					: <UnloggedMenu location={location}/>
				}
			</nav>
		</header>
	);
};

const mapStateToProps = state => ({
	loggedin: state.auth.loggedin,
	username: state.auth.session.username
});

const mapDispatchToProps = {
	logoutAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);