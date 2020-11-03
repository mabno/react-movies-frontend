import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const ProtectedRoute = ({loggedin, Component}) => {
	if(loggedin){
		return <Component/>;
	}
	else{
		return <Redirect to="/login"/>
	}
}

const mapStateToProps = (state) => ({
	loggedin: state.auth.loggedin
});

export default connect(mapStateToProps)(ProtectedRoute);