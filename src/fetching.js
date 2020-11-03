const API_REST_URI = 'http://localhost:80';

const register = (user) => {
	return fetch(`${API_REST_URI}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: user.username,
			password: user.password
		})
	})
}

const login = (user) => {
	return fetch(`${API_REST_URI}/login/${user.username}/${user.password}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

const getMovies = (token) => {
	return fetch(`${API_REST_URI}/movies`, {
		method: 'GET',
		headers: {
			'Authorization': token
		}
	});
}

const createMovie = (movie, token) => {
	return fetch(`${API_REST_URI}/movies`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		},
		body: JSON.stringify({
			title: movie.title,
			sinopsis: movie.sinopsis,
			thumbnail: movie.thumbnail,
			uploadedBy: movie.uploadedBy
		})
	})
}

const updateMovie = (movie, id, token) => {
	return fetch(`${API_REST_URI}/movies/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		},
		body: JSON.stringify({
			title: movie.title,
			sinopsis: movie.sinopsis,
			thumbnail: movie.thumbnail
		})
	})
}

const deleteMovie = (id, token) => {
	return fetch(`${API_REST_URI}/movies/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': token
		}
	})
}

export {register, login, getMovies, createMovie, updateMovie, deleteMovie};