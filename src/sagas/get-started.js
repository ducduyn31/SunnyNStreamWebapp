import { all, takeLatest, put, delay, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from '../constants';

export function* checkRoomAvailability({ payload }) {
  try {
    const responseCode = yield delay(1000, 200);
    switch (responseCode) {
      case 200:
        yield put({
          type: ActionTypes.REQUEST_ROOM_SUCCESS,
          payload: {
            message: 'Room available',
          },
        });
        break;
      case 201:
        yield put({
          type: ActionTypes.REQUEST_ROOM_SUCCESS,
          payload: {
            message: 'Room does not exist, creating new room',
          },
        });
        break;
      default:
        yield put({
          type: ActionTypes.REQUEST_ROOM_FAILURE,
          payload: {
            message: 'Room not available',
          },
        });
    }
  } catch (err) {
    yield put({
      type: ActionTypes.EXCEPTION,
      payload: err,
    });
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.REQUEST_ROOM, checkRoomAvailability)]);
}
