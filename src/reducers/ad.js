import { LOAD_ADS, REMOVE_AD, ADD_AD } from '../actions/types';

const initialState = {
  ads: [],
  loading: true,
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

    default:
      return state;
  }
}
