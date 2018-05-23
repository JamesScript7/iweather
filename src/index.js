import React from 'react';
import ReactDOM from 'react-dom';
// Components
import WeatherApp from './App';
// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise-middleware';
import reducer from './reducers';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css';

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
