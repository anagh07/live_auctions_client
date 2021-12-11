import { LOAD_ADS, REMOVE_AD, ADD_AD, LOAD_AD_DETAILS } from '../actions/types';

const initialState = {
  ads: [],
  loading: true,
  adDetails: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ADS:
      return {
        ...state,
        loading: false,
        ads: payload,
      };

    case LOAD_AD_DETAILS:
      return {
        ...state,
        adDetails: payload,
        loading: false,
      };

    default:
      return state;
  }
}
