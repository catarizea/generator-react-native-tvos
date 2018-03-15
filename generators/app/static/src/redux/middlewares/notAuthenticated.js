/* eslint eqeqeq: 0 */
import { get } from 'lodash';
import { activationActionTypes } from '../actionTypes';
import { activationActions } from '../actionCreators';

const {
  FETCH_ME,
  FETCH_CODE,
  LOGOUT,
} = activationActionTypes;

const { logout } = activationActions;

export default store => next => async action => {
  const { error, type } = action;
  const errorCode = get(error, 'response.status', null);

  const whitelistActions = [
    FETCH_ME[2],
    FETCH_CODE[2],
    LOGOUT[2],
  ];

  if (whitelistActions.indexOf(type) !== -1) {
    return next(action);
  }

  const { activation: { isAuthenticated } } = store.getState();
  if (isAuthenticated && errorCode == 401) {
    store.dispatch(logout());
  }

  return next(action);
};
