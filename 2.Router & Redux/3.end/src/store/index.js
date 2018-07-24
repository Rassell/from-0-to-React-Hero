import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import heroes, { heroSaga } from './heroes';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  heroes,
});

/* eslint-disable */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(reducers), // new root reducer with router state
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(heroSaga)

export {
  store as default,
  history,
}
/* eslint-enable */
