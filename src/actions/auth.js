import axios from 'axios';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async (dispath) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth`);
    dispath({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispath({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register =
  ({ name, email, password, phone, address }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username: name, email, password, address, phone });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user`,
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // Load user
      dispatch(loadUser());
    } catch (err) {
      // Get errors array sent by api
      if (!err.response) {
        dispatch(setAlert('Server error', 'error'));
      } else {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
        }
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth`,
      body,
      config
    );
    console.log(res.data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // Load user
    dispatch(loadUser());
  } catch (err) {
    // Get errors array sent by api
    if (!err.response) {
      dispatch(setAlert('Server error', 'error'));
    } else {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Skip login
export const skipLogin = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { email: 'test@test.com', password: '123456' };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // Load user
    dispatch(loadUser());
  } catch (err) {
    // Get errors array sent by api
    if (!err.response) {
      dispatch(setAlert('Server error', 'error'));
    } else {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
