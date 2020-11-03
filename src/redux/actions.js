import {getMovies} from '../fetching';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REQUEST_MOVIES = 'REQUEST_MOVIES';
const FAILURE_MOVIES = 'FAILURE_MOVIES';
const RECEIVE_MOVIES = 'RECEIVE_MOVIES';

const login = (session) => ({
	type: LOGIN,
	payload: {
		token: session.token,
		username: session.username,
		id: session.id
	}
})

const logout = () => ({
	type: LOGOUT
})

const requestMovies = () => ({
	type: REQUEST_MOVIES
})

const failureMovies = (details) => ({
	type: FAILURE_MOVIES,
	payload: {details}
})

const receiveMovies = (list) => ({
	type: RECEIVE_MOVIES,
	payload: {list}
})




const fetchMovies = (token) => dispatch => {
	dispatch(requestMovies());
	getMovies(token)
		.then(res => res.json())
		.then(data => {
			if(data.type){
				dispatch(failureMovies(data.details));
			}
			else{
				dispatch(receiveMovies(data));
			}
		})
		.catch(err => {
			dispatch(failureMovies(err));
		});
}

export { login, logout, fetchMovies };