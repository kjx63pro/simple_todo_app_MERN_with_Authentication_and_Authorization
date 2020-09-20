import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { set } from 'mongoose';

const Register = () => {
  const authContext = useContext(AuthContext);

  const { register } = authContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      // @todo - Set alert
      return;
    } else if (password !== password2) {
      // @todo - Set alert
      console.log('Passwords do not match');

      return;
    } else {
      register(user);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password: </label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' value='Sign Up' />
      </form>
    </div>
  );
};

export default Register;
