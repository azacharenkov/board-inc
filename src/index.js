import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {AppStore} from './AppStore.jsx'

ReactDOM.render(
    <Provider store = {AppStore.getStore()}>
		<App />
	</Provider>, 
    document.getElementById('root'));
registerServiceWorker();
