import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/index';

export const { togglePlayer } = createActions({
  [ActionTypes.TOGGLE_VIDEO_PLAYER]: () => ({}),
});
