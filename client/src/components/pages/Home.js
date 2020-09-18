import React from 'react';
import Todo from '../todos/Todo';
import AddForm from '../todos/AddForm';

const Home = () => {
  return (
    <div>
      <h2>
        Simple Todo App with React Hooks{' '}
        <span role='img' aria-label='rocket'>
          🚀
        </span>{' '}
      </h2>
      <Todo />
      <hr />
      <AddForm />
    </div>
  );
};

export default Home;
