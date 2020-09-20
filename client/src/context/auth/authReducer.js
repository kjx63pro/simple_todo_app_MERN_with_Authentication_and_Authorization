import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
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
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
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
