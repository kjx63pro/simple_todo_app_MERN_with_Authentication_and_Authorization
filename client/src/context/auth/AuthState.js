import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';

import authReducer from './authReducer';

import {} from '../types';

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
