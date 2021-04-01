// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/index';

export const { userLogin: login, userLogout: logOut, userSetNickname: setNick } = createActions({
  [ActionTypes.USER_LOGIN]: () => ({}),
  [ActionTypes.USER_LOGOUT]: () => ({}),
  [ActionTypes.USER_SET_NICKNAME]: newNickname => ({ nickname: newNickname }),
});
