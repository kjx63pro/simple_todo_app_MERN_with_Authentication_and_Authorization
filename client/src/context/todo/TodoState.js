import React, { useReducer } from 'react';
import axios from 'axios';
import TodoContext from './TodoContex';
import todoReducer from './todoReducer';

import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  TODOS_LOADING,
} from '../types';

const TodoState = (props) => {
  const initialState = {
    todos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const getTodos = async (todos) => {
    setTodosLoading();
    const res = await axios.get('/api/todos', todos);
    dispatch({ type: GET_TODOS, payload: res.data });
  };

  const addTodo = async (newTodo) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/todos', { text: newTodo }, config);
      dispatch({ type: ADD_TODO, payload: res.data });
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
    } catch (err) {
      console.error(err.message);
    }
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
  };

  const completeTodo = (id) => {
    dispatch({
      type: COMPLETE_TODO,
      payload: id,
    });
  };

  const setTodosLoading = () => {
    dispatch({
      type: TODOS_LOADING,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        getTodos,
        addTodo,
        deleteTodo,
        completeTodo,
        setTodosLoading,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
