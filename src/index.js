// React
import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
dotenv.config();

// Styles
import './css/index.css';

// Component
import WeatherApp from './App';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise-middleware';
import reducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENTION__ &&
  window.__REDUX_DEVTOOLS_EXTENTION__(),
  applyMiddleware(promise(), thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <WeatherApp />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
