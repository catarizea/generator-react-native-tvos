/* eslint eqeqeq: 0 */
import { get } from 'lodash';
import { activationActionTypes } from '../actionTypes';
import { activationActions } from '../actionCreators';

const { login } = activationActions;

const {
  FETCH_CODE,
  LOGOUT,
} = activationActionTypes;

export default store => next => async action => {
  const { type, payload } = action;
  const status = get(payload, 'status', null);

  const whitelistActions = [
    FETCH_CODE[1],
    LOGOUT[1],
  ];

  if (whitelistActions.indexOf(type) !== -1) {
    return next(action);
  }

  const { activation: { isAuthenticated } } = store.getState();
  if (!isAuthenticated && status == 200) {
    store.dispatch(login());
  }

  return next(action);
};
