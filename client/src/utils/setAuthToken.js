import axios from 'axios';

// Check to see if the token is passed in.
// If it is, then set the token to the global header
// If not, delete it from the global header
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
