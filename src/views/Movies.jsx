import React from 'react';

//Components
import MoviesList from '../components/MoviesList';

const Movies = () => {
	return <MoviesList setMovieToDeleteID={null} setMovieToUpdateID={null} filterByUsername={false}/>
}

export default Movies;