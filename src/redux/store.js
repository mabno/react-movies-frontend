import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import moviesReducer from './reducers/moviesReducer';

const initialState = {
	auth: {
		loggedin: false,
		session: {
			token: null,
			username: null,
			id: null
		}
	},
	movies: {
		status: 'request',
		details: '',
		list: []
	}
}

const rootReducer = combineReducers({auth: authReducer, movies: moviesReducer});

const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(thunk)
);

export default store;