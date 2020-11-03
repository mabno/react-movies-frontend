import React from 'react';

import './ListLoading.scss';

const ListLoading = ({loaded}) => {
	if(loaded){
		return null;
	}

	return (
		<div className='list-loading'>
			<div className="list-loading__circle"></div>
			<div className="list-loading__circle"></div>
			<div className="list-loading__circle"></div>
		</div>
	)
}

export default ListLoading;