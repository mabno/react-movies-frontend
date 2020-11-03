import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {createMovie, updateMovie} from '../fetching';
import {fetchMovies} from '../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MovieForm.scss';

const MovieForm = ({movieToUpdateID, cancelUpdate, moviesList, token, username, fetchMovies}) => {

	const [titleValue, setTitleValue] = useState(''); 
	const [thumbnailValue, setThumbnailValue] = useState(''); 
	const [sinopsisValue, setSinopsisValue] = useState('');
	const [error, setError] = useState(null);

	const movie = movieToUpdateID ? moviesList.filter(movie => movie._id === movieToUpdateID)[0] : null;
	
	useEffect(() => {
		if(movieToUpdateID){
			setTitleValue(movie.title);
			setThumbnailValue(movie.thumbnail);
			setSinopsisValue(movie.sinopsis);
			setError(null);
		} else {
			cleanInputs();
		}
	}, [movieToUpdateID]);


	
	const cleanInputs = () => {
		setTitleValue('');
		setThumbnailValue('');
		setSinopsisValue('');
		setError(null);
	}

	const submitHandler = (e) => {
		e.preventDefault();

		if(titleValue === '' || thumbnailValue === '' || sinopsisValue === ''){
			setError('Complete all fields');
			return;
		}

		if(!/^.+\.(jpg||png||jpeg||svg)$/.test(thumbnailValue)){
			setError('Poster URL inserted is not valid');
			return;
		}

		let imageInserted = new Image();
		imageInserted.src = thumbnailValue;
		
		imageInserted.onerror = () => {
			setError(`Poster URL inserted doesn't exist`);
		}

		imageInserted.onload = () => {
			if(!movieToUpdateID){
				addHandler();
			}
			else{
				updateHandler();
			}
		}
	}

	const updateHandler = () => {
		updateMovie({
			title: titleValue.trim(),
			sinopsis: sinopsisValue.trim(),
			thumbnail: thumbnailValue.trim()
		}, movie._id, token)
		.then(res => res.json())
		.then(data => {
			if(!data.type){
				cancelUpdate();
				fetchMovies(token);
			}else{
				console.log('Error ', data.details);
			}
		})
		.catch(err => console.log('Error ', err));
	}

	const addHandler = () => {
		createMovie({
			title: titleValue.trim(),
			sinopsis: sinopsisValue.trim(),
			thumbnail: thumbnailValue.trim(),
			uploadedBy: username
		}, token)
		.then(res => res.json())
		.then(data => {
			if(!data.type){
				cleanInputs();
				fetchMovies(token);
			}else{
				console.log('Error ', data.details);
			}
		})
		.catch(err => console.log('Error ', err));
	}

	const showError = () => {
		return (
			<div className="movie-form__error">
				<FontAwesomeIcon icon="times"/>&nbsp;
				{error}
			</div>
		)
	}

	return (
		<form className="movie-form" autoComplete="off">
			<div className="movie-form__title">{
				!movieToUpdateID ? 'Add ' : 'Edit '} 
				Movie 
				<b>{!movieToUpdateID ? null : ` ${movie.title}`}</b>
			</div>
			<input className="movie-form__input" type="text" placeholder="Title"
				value={titleValue}
				onChange={(e) => setTitleValue(e.target.value)}
			/>
			<input className="movie-form__input" type="text" placeholder="Poster URL"
				value={thumbnailValue}
				onChange={(e) => setThumbnailValue(e.target.value)}
			/>
			<textarea className="movie-form__textarea" rows="10" placeholder="Sinopsis"
				value={sinopsisValue}
				onChange={(e) => setSinopsisValue(e.target.value)}
			></textarea>

			{error != null ? showError() : null}

			<div className="movie-form__row">
				{
					movieToUpdateID ?
					<button className="action-button--orange" onClick={cancelUpdate}> CANCEL </button>
					: null
				}
				<button className="action-button--orange" type="submit" onClick={submitHandler}> 
					{!movieToUpdateID ? 'ADD' : 'UPDATE'} 
				</button>
			</div>
		</form>
	)
}

const mapStateToProps = (state) => ({
	moviesList: state.movies.list,
	token: state.auth.session.token,
	username: state.auth.session.username
})

const mapDispatchToProps = {
	fetchMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);