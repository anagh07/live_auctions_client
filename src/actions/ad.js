import axios from 'axios';
import { LOAD_ADS, LOAD_AD_DETAILS } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load ads
export const loadAds = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ad`);

    dispatch({
      type: LOAD_ADS,
      payload: res.data,
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      dispatch(setAlert('Server error', 'danger'));
    }
    // console.log(error.response);
    // const errors = error.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }
  }
};

// Load ad details
export const loadAdDetails = (adId) => async (dispatch) => {
  try {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ad/${adId}`);

    dispatch({
      type: LOAD_AD_DETAILS,
      payload: res.data,
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      dispatch(setAlert('Server error', 'danger'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 50000)));
    }
  }
};
