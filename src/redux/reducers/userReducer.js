import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILED,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  RESET_USER_STATE,
} from '../actions/usersActions';

const initialState = {
  loading: true,
  allUser: [],
  User: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, loading: true };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        allUser: action.payload,
        limit: action.limit,
        total: action.total,
      };
    case GET_USERS_FAILED:
      return { ...state, error: action.error, loading: false };
    case GET_USER_BY_ID:
      return { ...state, loading: true };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        User: action.payload,
        limit: action.limit,
        total: action.total,
      };
    case GET_USER_BY_ID_FAILED:
      return { ...state, error: action.error, loading: false };
    case CREATE_USER:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false };
    case CREATE_USER_FAILED:
      return { ...state, error: action.error, loading: false };
    case UPDATE_USER:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_USER_FAILED:
      return { ...state, error: action.error };
    case DELETE_USER:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false };
    case DELETE_USER_FAILED:
      return { ...state, error: action.error };
    case RESET_USER_STATE:
      return initialState;
    default:
      return state;
  }
}
