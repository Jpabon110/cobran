/* eslint-disable no-shadow */
import {
  GET_ME,
  GET_ME_SUCCESS,
  GET_ME_FAILED,
  UPDATE_ME,
  UPDATE_ME_SUCCESS,
  UPDATE_ME_FAILED,
  UPDATE_ME_PASSWORD,
  UPDATE_ME_PASSWORD_SUCCESS,
  UPDATE_ME_PASSWORD_FAILED,
  RESET_ME_STATE,
} from '../actions/meActions';

const initialState = {
  loading: false,
  me: '',
  error: '',
};

export default function me(state = initialState, action) {
  switch (action.type) {
    case GET_ME:
      return { ...state, loading: true };
    case GET_ME_SUCCESS:
      return { ...state, loading: false, me: action.payload };
    case GET_ME_FAILED:
      return { ...state, loading: false, error: action.error };
    case UPDATE_ME:
      return { ...state, loading: true };
    case UPDATE_ME_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_ME_FAILED:
      return { ...state, loading: false, error: action.error };
    case UPDATE_ME_PASSWORD:
      return { ...state, loading: true };
    case UPDATE_ME_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_ME_PASSWORD_FAILED:
      return { ...state, loading: false, error: action.error };
    case RESET_ME_STATE:
      return initialState;
    default:
      return state;
  }
}
