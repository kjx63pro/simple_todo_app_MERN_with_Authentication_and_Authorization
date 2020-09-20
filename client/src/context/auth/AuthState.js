import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';

import authReducer from './authReducer';

import setAuthToken from '../../utils/setAuthToken';

import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

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

  const login = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // console.log(user); {name: "Kenji Ueyama", email: "kenji@gmail.com", password: "123456", password2: "123456"}
    try {
      const res = await axios.post('/api/auth', user, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
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
        login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
