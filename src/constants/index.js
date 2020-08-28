import { keyMirror } from '../modules/helpers';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  SWITCH_MENU: undefined,
  EXCEPTION: undefined,
  USER_LOGIN: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_LOGOUT: undefined,
  USER_LOGOUT_SUCCESS: undefined,
  USER_LOGOUT_FAILURE: undefined,
  GITHUB_GET_REPOS: undefined,
  GITHUB_GET_REPOS_SUCCESS: undefined,
  GITHUB_GET_REPOS_FAILURE: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
  HIDE_APP_BAR: undefined,
  SHOW_APP_BAR: undefined,
  TRANSPARENT_APP_BAR: undefined,
  MATERIAL_APP_BAR: undefined,
  /* Get Started Actions */
  NEXT_STEP: undefined,
  PREVIOUS_STEP: undefined,
  /* Movie Room Actions */
  TOGGLE_VIDEO_PLAYER: undefined,
});

/**
 * @constant {Object} STATUS
 * @memberof Constants
 */
export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const VIDEO_STATE = {
  LOADING: 'loading',
  PLAYING: 'playing',
  PAUSE: 'pause',
  ERROR: 'error',
};
