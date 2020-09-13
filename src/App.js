import React from 'react';
import { Provider } from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import store from './store/index';
import Auth from './components/Auth/Auth';
import Events from './components/Events/Events';


function App() {
	return (
		<Provider store = {store}>
			<Router>
				<Switch>
					<Route path = '/' exact>
						<Auth />
					</Route>
					<Route path = '/events'>
						<Events />
					</Route>
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
