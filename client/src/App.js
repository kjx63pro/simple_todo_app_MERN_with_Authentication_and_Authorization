import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Todo from './components/Todo';
import AddForm from './components/AddForm';
import AppNavbar from './components/Navbar/AppNavbar';
import About from './components/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';

import TodoState from './context/todo/TodoState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';
import Home from './components/pages/Home';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <TodoState>
        <AlertState>
          <Router>
            <AppNavbar />
            <Alerts />
            <div className='app'>
              <Switch>
                <PrivateRoute path='/' exact component={Home}></PrivateRoute>
                <Route exact path='/about' component={About}></Route>
                <Route exact path='/register' component={Register}></Route>
                <Route exact path='/login' component={Login}></Route>
              </Switch>
            </div>
          </Router>
        </AlertState>
      </TodoState>
    </AuthState>
  );
}

export default App;
