import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
