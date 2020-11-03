import React, {useState} from 'react';

//Components
import MoviesList from '../components/MoviesList';
import MovieForm from '../components/MovieForm';
import ModalDelete from '../components/ModalDelete';

const MyMovies = () => {

	const [movieToDeleteID, setMovieToDeleteID] = useState(null);
	const [movieToUpdateID, setMovieToUpdateID] = useState(null);

	const cancelUpdate = () => {
		setMovieToUpdateID(null);
	}

	const cancelDelete = () => {
		setMovieToDeleteID(null);
	}

	return (
		<div className="centered-content--start">
			<MovieForm
				movieToUpdateID={movieToUpdateID}
				cancelUpdate={cancelUpdate}
			/>
			<MoviesList
				setMovieToDeleteID={setMovieToDeleteID}
				setMovieToUpdateID={setMovieToUpdateID}
				filterByUsername={true}
			/>

			<ModalDelete
				movieToDeleteID={movieToDeleteID}
				cancelDelete={cancelDelete}
			/>
		</div>
	)
}

export default MyMovies;