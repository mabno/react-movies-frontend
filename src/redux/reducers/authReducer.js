const authReducer = (state={}, action) => {
	switch(action.type){
		case 'LOGIN':
			return {
				loggedin: true, 
				session: {
					token: action.payload.token,
					username: action.payload.username,
					id: action.payload.id
				}
			};

		case 'LOGOUT':
			return {
				loggedin: false,
				session: {
					token: null,
					username: null,
					id: null
				}
			};

		default:
			return state;
	}
}

export default authReducer;