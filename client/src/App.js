import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TodoState from './context/todo/TodoState.js';
import AuthState from './context/auth/AuthState.js';

import AppNavbar from './components/layout/AppNavbar';
import About from './components/pages/About';
import Register from './components/auth/Register';

import Home from './components/pages/Home';
import setAuthToken from './utils/setAuthToken';
import Login from './components/auth/Login';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <TodoState>
        <Router>
          <AppNavbar />
          <div className='app'>
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/about' exact component={About}></Route>
              <Route path='/register' component={Register}></Route>
              <Route path='/login' exact component={Login}></Route>
            </Switch>
          </div>
        </Router>
      </TodoState>
    </AuthState>
  );
}

export default App;
