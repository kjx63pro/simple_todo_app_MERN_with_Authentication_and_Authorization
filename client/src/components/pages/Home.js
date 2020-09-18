import React from 'react';
import Todo from '../Todo';
import AddForm from '../AddForm';

const Home = () => {
  return (
    <div>
      <Todo />
      <hr />
      <AddForm />
    </div>
  );
};

export default Home;
