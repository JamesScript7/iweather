import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

console.log('webpack?');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
