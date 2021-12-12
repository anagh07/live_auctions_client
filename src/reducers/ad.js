import {
  POST_AD,
  LOAD_ADS,
  REMOVE_AD,
  ADD_AD,
  LOAD_AD_DETAILS,
  LOAD_HIGHEST_BID,
  PLACE_BID,
} from '../actions/types';

const initialState = {
  ads: [],
  loading: true,
  adDetails: { currentPrice: { $numberDecimal: 0 } },
  loadingHighestBid: true,
  highestBid: { user: { username: '' } },
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

    case LOAD_HIGHEST_BID:
      return {
        ...state,
        highestBid: payload,
        loadingHighestBid: false,
      };

    case PLACE_BID:
      return {
        ...state,
        adDetails: { ...payload.adDetails, owner: state.adDetails.owner },
        highestBid: payload.highestBid,
      };

    case POST_AD:
      return {
        ...state,
        ads: [...state.ads, payload],
        loading: false,
      };

    default:
      return state;
  }
}
