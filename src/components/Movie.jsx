import React from 'react';

import moment from 'moment';


import './Movie.scss';

const Movie = ({movie, setMovieToDeleteID, setMovieToUpdateID, myRef}) => {
	const m = movie;

	const editHandler = () => {
		if(window.innerWidth < 1024){
			window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
		}
		setMovieToUpdateID(m._id);
	}

	return (
		<article className="movie" ref={myRef}>
			<div className="movie__info-container">
				<h1 className="movie__title">{m.title}</h1>
			</div>
			<div className="movie__thumbnail-group">
				<img className="movie__thumbnail" src={m.thumbnail}/>
				<img className="movie__thumbnail-bg" src={m.thumbnail}/>
			</div>
			<div className="movie__info-container">
				<span className="movie__info-title">Sinopsis</span>
				<p className="movie__sinopsis">{m.sinopsis}</p>
				<div className="movie__row">
					<div>
						<span className="movie__info-title">Uploaded</span>
						<div className="movie__info">{moment(m.uploadedAt).fromNow()}</div>
					</div>
					<div>
						<span className="movie__info-title">Uploaded by</span>
						<div className="movie__info">{m.uploadedBy}</div>
					</div>
				</div>
			</div>
			{	setMovieToDeleteID != null && setMovieToUpdateID != null ?
				<div className="movie__actions-row">
						<button className="action-button" onClick={setMovieToDeleteID.bind(null, m._id)}>DELETE</button>
						<button className="action-button" onClick={editHandler}>EDIT</button>
				</div>
				: null

			}
		</article>
	)
}

export default Movie;