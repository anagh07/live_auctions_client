import {
  POST_AD,
  LOAD_ADS,
  LOAD_AD_DETAILS,
  LOAD_AD_IMAGE,
  LOAD_HIGHEST_BID,
  PLACE_BID,
  START_AUCTION,
  USER_PURCHASED_LOADED,
  AD_POSTED_BY_OTHER,
  UPDATE_AD_IN_AD_LIST,
  UPDATE_TIMER,
  UPDATE_AD_DETAILS,
  CLEAR_AD_IMAGE,
  IMAGE_LOADING,
  CLEAR_AD_DETAILS,
} from '../actions/types';

const initialState = {
  ads: [],
  loading: true,
  imageLoading: true,
  adDetails: { currentPrice: { $numberDecimal: 0 } },
  loadingHighestBid: true,
  highestBid: { user: { username: '' } },
  purchasedLoading: true,
  purchased: [],
  adImage: null,
};

export default function adReduce(state = initialState, action) {
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

    case CLEAR_AD_DETAILS:
      return {
        ...state,
        adDetails: { currentPrice: { $numberDecimal: 0 } },
      };

    case LOAD_AD_IMAGE:
      return {
        ...state,
        adImage: payload,
        imageLoading: false,
      };

    case IMAGE_LOADING:
      return {
        ...state,
        imageLoading: true,
      };

    case CLEAR_AD_IMAGE:
      return {
        ...state,
        adImage: null,
        loading: false,
      };

    case UPDATE_AD_DETAILS:
      if (payload._id === state.adDetails._id) {
        return {
          ...state,
          adDetails: payload,
          loading: false,
        };
      } else {
        return {
          ...state,
        };
      }

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

    case START_AUCTION:
      return {
        ...state,
        adDetails: { ...state.adDetails, auctionStarted: true },
        loading: false,
      };

    case USER_PURCHASED_LOADED:
      return {
        ...state,
        purchased: payload,
        purchasedLoading: false,
      };

    case AD_POSTED_BY_OTHER:
      return {
        ...state,
        ads: [payload, ...state.ads],
      };

    case UPDATE_AD_IN_AD_LIST:
      let updatedList = state.ads.map((ad) => {
        if (ad._id.toString() === payload._id.toString()) return payload;
        else return ad;
      });
      return {
        ...state,
        ads: updatedList,
        loading: false,
      };

    case UPDATE_TIMER:
      console.log(state.adDetails._id);
      console.log(payload);
      if (state.adDetails._id === payload._id) {
        return {
          ...state,
          adDetails: { ...state.adDetails, timer: payload.timer },
          loading: false,
        };
      } else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
}
