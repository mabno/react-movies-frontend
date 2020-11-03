import React, {useState} from 'react';

import {register, login} from '../fetching';
import Cookie from 'js-cookie';
import {connect} from 'react-redux';
import {login as loginAction} from '../redux/actions';
import {Redirect} from 'react-router-dom';

import EntryForm from '../components/EntryForm';


const formInputs = [
	{
		icon: 'user',
		placeholder: 'Username',
		type: 'text',
		name: 'username'
	},
	{
		icon: 'key',
		placeholder: 'Password',
		type: 'password',
		name: 'password'
	},
	{
		icon: 'key',
		placeholder: 'Repeat the password',
		type: 'password',
		name: 'password2'
	}
]

const Register = ({loggedin, loginAction}) => {
	const [formError, setFormError] = useState(null);

	const sendFormHandler = (inputs) => {
		const username = inputs['username'].value.trim();
		const password = inputs['password'].value.trim();
		const password2 = inputs['password2'].value.trim();

		if(username.length < 6){
			setFormError(`Username must have at least 6 characters`)
			return;
		}
		if(password.length < 6){
			setFormError(`Password must have at least 6 characters`)
			return;
		}

		if(password != password2){
			setFormError(`Passwords don't match`);
			return;
		}

		register({username, password})
			.then((res) => res.json())
			.then((data) => {
				if(data.status === 400){
					setFormError(data.details);
				}
				else{
					login({username, password})
						.then((res) => res.json())
						.then((data) => {
							let session = {token: data.token, username: data.username, id: data.id};
							Cookie.set('session', session);
							loginAction(session);
						})
						.catch((err) => console.log('Error:', err))
				}
			})
			.catch((err) => console.log('Error:', err));
	}

	if(loggedin) {
		return <Redirect to="/"/>
	}

	return (
		<div className="centered-content">
			<EntryForm
				sendFormHandler={sendFormHandler}
				formError={formError}
				title="Signup"
				inputs={formInputs}
				alt={{text: 'Login', link: '/login'}}
			/>
		</div>
	)
}

const mapStateToProps = state => ({
	loggedin: state.auth.loggedin
});

const mapDispatchToProps = {
	loginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);