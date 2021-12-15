import { v4 as uuid } from 'uuid';

import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from './types';

export const setAlert =
  (msg, type, timeout = 5000) =>
  (dispatch) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, timeout);
  };

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};

export const clearAlerts = () => (dispatch) => {
  dispatch({
    type: CLEAR_ALERTS,
  });
};
