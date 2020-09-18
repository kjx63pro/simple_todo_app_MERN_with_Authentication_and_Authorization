import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // Set token to the (global) default headers
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
