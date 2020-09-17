import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Todo from './components/Todo';
import AddForm from './components/AddForm';
import AppNavbar from './components/Navbar/AppNavbar';
import About from './components/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import TodoState from './context/todo/TodoState';
import AuthState from './context/auth/AuthState';

import './App.css';

function App() {
  return (
    <AuthState>
      <TodoState>
        <Router>
          <AppNavbar />
          <div className='app'>
            <Switch>
              <Route path='/' exact>
                <h2>
                  Simple Todo App with React Hooks{' '}
                  <span role='img' aria-label='rocket'>
                    🚀
                  </span>{' '}
                </h2>
                <Todo />
                <hr />
                <AddForm />
              </Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/login' component={Login}></Route>
            </Switch>
          </div>
        </Router>
      </TodoState>
    </AuthState>
  );
}

export default App;
