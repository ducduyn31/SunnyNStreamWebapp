// @flow
import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/index';

export const { nextStep, previousStep } = createActions({
  [ActionTypes.NEXT_STEP]: () => ({}),
  [ActionTypes.PREVIOUS_STEP]: () => ({}),
});
