import React, { useContext, useEffect, Fragment } from 'react';
import './Todo.css';
import TodoContext from '../context/todo/todoContex';
import AuthContext from '../context/auth/authContext';

import { Button } from '@material-ui/core';
import Spinner from './layout/Spinner';

const Todo = () => {
  const todoContext = useContext(TodoContext);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    todoContext.getTodos();
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {todoContext.loading ? (
        <Spinner />
      ) : (
        <div className='todo'>
          {todoContext.todos?.length === 0 ? (
            <div className='todo__whenNothingtoList'>
              <p>
                There is no Todo at the moment.
                <br />
                Please Add New Todo...
              </p>
            </div>
          ) : (
            <div>
              {todoContext.todos?.map((todo, index) => (
                <div className='todo__list' key={index}>
                  <p
                    className={todo.isCompleted ? 'todo__isCompleted' : ''}
                    onClick={() => {
                      todoContext.completeTodo(todo._id);
                    }}
                  >
                    {todo.text}
                  </p>
                  <div className='todo__button'>
                    <Button
                      onClick={() => todoContext.deleteTodo(todo._id)}
                      variant='contained'
                      color='secondary'
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Todo;
