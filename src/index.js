import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.hydrate(
	<Router>
		<App />
	</Router>, 
	document.getElementById('root'));

serviceWorker.register();