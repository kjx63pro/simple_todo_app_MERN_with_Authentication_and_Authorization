import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';

import authReducer from './authReducer';

import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

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
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
