import { handleActions } from '../modules/helpers';
import { ActionTypes } from '../constants';

export const getStartedState = {
  progress: 0,
  steps: [
    { label: 'name', description: 'Enter your name' },
    { label: 'room', description: 'Select a room' },
    { label: 'auth', description: 'Enter passcode' },
    { label: 'complete', description: 'Enjoy!' },
  ],
  room: {
    requestingRoom: '',
    requestingPw: '',
  },
};

export default {
  getStarted: handleActions(
    {
      [ActionTypes.NEXT_STEP_SUCCESS]: draft => {
        draft.progress =
          draft.progress < draft.steps.length - 1 ? draft.progress + 1 : draft.progress;
      },
      [ActionTypes.PREVIOUS_STEP]: draft => {
        draft.progress = draft.progress > 1 ? draft.progress - 1 : 0;
      },
    },
    getStartedState,
  ),
};
