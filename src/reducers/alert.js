import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from '../actions/types';

const initialState = []; // [ { msg: '', type: '', id: '' } ]

export default function alertReduce(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);

    case CLEAR_ALERTS:
      return [];

    default:
      return state;
  }
}
