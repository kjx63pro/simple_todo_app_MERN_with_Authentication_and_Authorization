import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TodoState from './context/todo/TodoState.js';
import AppNavbar from './components/layout/AppNavbar';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import AuthState from './context/auth/AuthState';

function App() {
  return (
    <AuthState>
      <TodoState>
        <Router>
          <AppNavbar />
          <div className='app'>
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/about' component={About}></Route>
              <Route path='/register' component={Register}></Route>
              <Route path='/login' component={Login}></Route>
            </Switch>
          </div>
        </Router>
      </TodoState>
    </AuthState>
  );
}

export default App;
