import React, {useState} from 'react';
import {login} from '../fetching';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login as loginAction} from '../redux/actions';
import Cookie from 'js-cookie';

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
	}
]


const Login = ({loggedin, loginAction}) => {
	const [formError, setFormError] = useState(null);

	const sendFormHandler = (inputs) => {
		const username = inputs['username'].value.trim();
		const password = inputs['password'].value.trim();

		login({username, password})
			.then((res) => res.json())
			.then((data) => {
				if(data.status === 401){
					setFormError(data.details);
				}
				else {
					let session = {token: data.token, username: data.username, id: data.id};
					Cookie.set('session', session);
					loginAction(session);
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
				title="Login"
				inputs={formInputs}
				alt={{text: 'Signup', link: '/signup'}}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);