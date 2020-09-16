import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  TODOS_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };

    case ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case DELETE_TODO:
      const newTodo = [...state.todos];
      newTodo.splice(action.payload, 1);
      return {
        ...state,
        todos: newTodo,
      };

    case COMPLETE_TODO:
      const completeTodo = state.todos.find((t) => t._id === action.payload);
      completeTodo.isCompleted = !completeTodo.isCompleted;
      return {
        ...state,
        todos: [...state.todos],
      };
    case TODOS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
