import axios from 'axios';
import {
  LOAD_ADS,
  LOAD_AD_DETAILS,
  LOAD_HIGHEST_BID,
  PLACE_BID,
  POST_AD,
  START_AUCTION,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load ads
export const loadAds =
  (userId = null) =>
  async (dispatch) => {
    let config = null;
    if (userId) {
      config = { params: { user: userId } };
    }
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ad`, config);

      dispatch({
        type: LOAD_ADS,
        payload: res.data,
      });
    } catch (error) {
      // Get errors array sent by api
      if (!error.response) {
        return dispatch(setAlert('Server error', 'danger'));
      }
      console.log(error.response);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
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
      return dispatch(setAlert('Server error', 'danger'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 50000)));
    }
  }
};

// Current highest bid on ad
export const loadHighestBid = (adId) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/bid/${adId}`;
  try {
    const res = await axios.get(url, { params: { option: 'highest' } });

    dispatch({
      type: LOAD_HIGHEST_BID,
      payload: res.data[0],
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'danger'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 50000)));
    }
  }
};

// Place bid
export const placeBid = (adId, bidAmount) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/bid/${adId}`;
  try {
    const res = await axios.post(url, null, { params: { amount: bidAmount } });
    const res2 = await axios.get(url, { params: { option: 'highest' } });
    dispatch({
      type: PLACE_BID,
      payload: { adDetails: res.data, highestBid: res2.data[0] },
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'danger'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 50000)));
    }
  }
};

// Post ad
export const postAd = (data) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/ad`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch({
      type: POST_AD,
      payload: res.data.ad,
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'danger'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 50000)));
    }
  }
};

// Post ad
export const startAuction = (adId) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/auction/start/${adId}`;
  try {
    const res = await axios.get(url);

    dispatch({
      type: START_AUCTION,
    });
  } catch (error) {
    // Get errors array sent by api
    if (!error.response) {
      return dispatch(setAlert('Server error', 'danger'));
    }
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger', 50000)));
    }
  }
};
