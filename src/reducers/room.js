import { VIDEO_STATE } from '../constants';
import { handleActions } from '../modules/helpers';

import { ActionTypes } from '../constants';

export const roomState = {
  videoState: VIDEO_STATE.LOADING,
};

export default {
  room: handleActions(
    {
      [ActionTypes.TOGGLE_VIDEO_PLAYER]: draft => {
        if (draft.videoState === VIDEO_STATE.PLAYING) draft.videoState = VIDEO_STATE.PAUSE;
        else if (draft.videoState === VIDEO_STATE.PAUSE) draft.videoState = VIDEO_STATE.PLAYING;
      },
    },
    roomState,
  ),
};
