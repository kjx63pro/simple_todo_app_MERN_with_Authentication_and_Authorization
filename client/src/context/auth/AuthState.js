import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';

import authReducer from './authReducer';

import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    // @todo - load token into global headers
    console.log(localStorage); //
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    console.log(axios.defaults.headers.common['x-auth-token']); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY2NzMwNmU4MDA4YjkyMWNlNjJhNjA3In0sImlhdCI6MTYwMDU5ODEyNiwiZXhwIjoxNjAwNjM0MTI2fQ.TWp6HKM0dF8maU81vy_RRhyGIJVsESpo5AMr4h6YfnY

    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  const register = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // console.log(user); {name: "Kenji Ueyama", email: "kenji@gmail.com", password: "123456", password2: "123456"}
    try {
      const res = await axios.post('/api/users', user, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        token: state.token,
        error: state.error,
        loadUser,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
