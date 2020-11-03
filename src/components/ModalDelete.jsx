import React from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';

import {deleteMovie} from '../fetching';
import {fetchMovies} from '../redux/actions';

import './ModalDelete.scss';

const ModalDelete = ({movieToDeleteID, cancelDelete, token, fetchMovies}) => {

	const deleteHandler = () => {
		deleteMovie(movieToDeleteID, token)
			.then(res => res.json())
			.then(data => {
				if(!data.type){
					fetchMovies(token);
					cancelDelete();
				}
				else{
					console.log(data.details);
				}
			})
			.catch(err => console.log(err))
	}

	return (
		<CSSTransition
			in={movieToDeleteID != null}
			classNames="modal"
			timeout={300}
			unmountOnExit
		>
			<div className="modal-delete">
				<div className="modal-box">
					<div className="modal-box__title">Are you sure to delete this movie?</div>
					<div className="modal-box__actions">
						<button className="action-button--orange" onClick={cancelDelete}>NO</button>
						<button className="action-button--orange" onClick={deleteHandler}>YES</button>
					</div>
				</div>
			</div>
		</CSSTransition>
	);
}

const mapStateToProps = (state) => ({
	token: state.auth.session.token
})

const mapDispatchToProps = {
	fetchMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDelete);