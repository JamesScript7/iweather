// React
import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import './css/index.css';

// Component
import App from './App';
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
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
