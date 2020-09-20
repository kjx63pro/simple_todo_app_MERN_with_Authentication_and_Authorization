import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    // eslint-disable-next-line
  }, [props.history, isAuthenticated]);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      // @todo - Set alert
      return;
    } else {
      login(user);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address: </label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Passowrd: </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default Login;
