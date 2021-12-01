import axios from 'axios';
import { LOAD_ADS } from './types';
import { setAlert } from './alert';

// Load ads
export const loadAds = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ad`);
    console.log(res.data);

    dispatch({
      type: LOAD_ADS,
      payload: res.data,
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      dispatch(setAlert('Server error', 'danger'));
    }
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
