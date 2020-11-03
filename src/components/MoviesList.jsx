import React, {useState, useEffect, useRef, createRef} from 'react';
import {connect} from 'react-redux';
import {fetchMovies} from '../redux/actions';

import ScrollReveal from 'scrollreveal';

//Components
import Movie from './Movie';
import ListLoading from './ListLoading';

import './MoviesList.scss';

const MoviesList = ({token, username, movies, fetchMovies, setMovieToDeleteID, setMovieToUpdateID, filterByUsername}) => {

	const [filteredMovies, setFilteredMovies] = useState([]);
	const movieRefs = useRef([]);

	if(movieRefs.current.length !== filteredMovies.length){
		movieRefs.current = filteredMovies.map((el, i) => movieRefs.current[i] || createRef());
	}

	useEffect(() => {
		if(movies.status === 'request'){
			fetchMovies(token);
		}
	}, [])

	useEffect(() => {
		if(filterByUsername){
			setFilteredMovies(movies.list.filter((m) => m.uploadedBy === username));
		} else{
			setFilteredMovies(movies.list);
		}
	}, [movies]);

	// Add scroll reveal to all movies
	useEffect(() => {
		if(movieRefs.current.length > 0){
			let nodes = movieRefs.current.map((el) => el.current);
			ScrollReveal().reveal(nodes, {distance: '100px', duration: 800, interval: 200});
		}
	})

	return (
		<div className="movie-list">
			<ListLoading loaded={movies.status === 'receive'}/>
			{	filteredMovies.length === 0  && movies.status === 'receive' && filterByUsername ? 
				<div className="list-message">You didn't upload any image</div>
				: null
			}
			{
				filteredMovies.map((el, i) => (
					<Movie 
						key={el._id}
						movie={el}
						setMovieToDeleteID={setMovieToDeleteID}
						setMovieToUpdateID={setMovieToUpdateID}
						myRef={movieRefs.current[i]}
					/>
				))
			}
		</div>
	)
}

const mapStateToProps = (state) => ({
	token: state.auth.session.token,
	username: state.auth.session.username,
	movies: state.movies
})

const mapDispatchToProps = {
	fetchMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);