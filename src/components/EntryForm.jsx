import React, {useState, useRef} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './EntryForm.scss';

const EntryForm = (props) => {
	const { sendFormHandler, formError, inputs, title, alt} = props;
	const [submitActive, setSubmitActive] = useState(false);
	const formRef = useRef(null);

	const changeInputHandler = (e) => {
		let enableSubmit = checkAllInputs();
		if(enableSubmit != submitActive){
			setSubmitActive(enableSubmit);
		}
	}

	const checkAllInputs = () =>  {
		const inputs = formRef.current.elements;
		for(let i = 0; i < inputs.length; i++){
			if(inputs[i].type != 'submit' && inputs[i].value.length === 0){
				return false;
			}
		}
		return true;
	}

	const showError = () => {
		return (
			<div className="entry-form__error">
				<FontAwesomeIcon icon="times"/>&nbsp;
				{formError}
			</div>
		)
	}

	const sendForm = (e) => {
		e.preventDefault();
		sendFormHandler(formRef.current.elements);
	}
	

	return (
		<form ref={formRef} className="entry-form">
			<div className="entry-form__title">{title}</div>
			{inputs.map((input, index) => (
				<label key={index} className="entry-field">
					<FontAwesomeIcon className="entry-field__icon" icon={input.icon}/>
					<input 
						className="entry-field__input"
						placeholder={input.placeholder}
						type={input.type}
						name={input.name}
						autoComplete="off"
						onChange={changeInputHandler}
					/>
				</label>
			))}

			{formError ? showError() : null}

			<div className="entry-form__buttons">
				<Link className="link-button" to={alt.link}>{alt.text}</Link>
				<button className={'entry-button' + (submitActive ? '' : ' disabled')} type="submit" onClick={sendForm}>{title}</button>
			</div>
		</form>
	);
};

export default EntryForm;