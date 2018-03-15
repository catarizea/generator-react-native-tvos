import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import apiMiddleware from './middlewares/api';
import authenticatedMiddleware from './middlewares/authenticated';
import notAuthenticatedMiddleware from './middlewares/notAuthenticated';
import reducers from './reducers';

const prepareStore = device => {
  const middlewares = [
    thunkMiddleware,
    apiMiddleware(device),
    authenticatedMiddleware,
    notAuthenticatedMiddleware,
  ];

  if (__DEV__) {
    middlewares.push(loggerMiddleware);
  }

  const middle = applyMiddleware(...middlewares);

  const composeEnhancers = composeWithDevTools({
    realtime: true,
  });

  const configureStore = () =>
    createStore(
      reducers,
      __DEV__ ? composeEnhancers(middle) : compose(middle),
    );

  return configureStore();
};

export default prepareStore;
