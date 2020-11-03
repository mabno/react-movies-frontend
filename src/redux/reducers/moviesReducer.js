const moviesReducer = (state={}, action) => {
	switch(action.type){
		case 'REQUEST_MOVIES':
			return {
				...state, 
				status: 'request'
			};

		case 'FAILURE_MOVIES':
			return {
				...state, 
				status: 'failure',
				details: action.payload.details
			};

		case 'RECEIVE_MOVIES':
			return {
				...state, 
				status: 'receive',
				list: action.payload.list
			};

		default:
			return state;
	}
}

export default moviesReducer;