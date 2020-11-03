import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// App component
import App from './App';

const Root = () => (
	<Provider store={store}>
		<App/>
	</Provider>
);

const rootElement = document.getElementById('root');
render(<Root/>, rootElement);
