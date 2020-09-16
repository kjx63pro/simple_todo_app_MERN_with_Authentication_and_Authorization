import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Todo from './components/Todo';
import AddForm from './components/AddForm';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TodoState from './context/todo/TodoState.js';
import AppNavbar from './components/Navbar/AppNavbar';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
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
            <Route path='/about' component={About}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/login' component={Login}></Route>
          </Switch>
        </div>
      </Router>
    </TodoState>
  );
}

export default App;
