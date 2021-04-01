// @flow
import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/index';

export const { nextStep, previousStep } = createActions({
  [ActionTypes.NEXT_STEP]: (currentStep, steps) => ({ currentStep, steps }),
  [ActionTypes.PREVIOUS_STEP]: () => ({}),
  [ActionTypes.REQUEST_ROOM]: roomCode => ({ requestingRoom: roomCode }),
  [ActionTypes.ENTER_ROOM_PW]: password => ({ requestingPw: password }),
});
