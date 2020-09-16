import React, { useState, useContext } from 'react';
import './AddForm.css';

import TodoContext from '../context/todo/TodoContex';

import { Button } from '@material-ui/core';

const AddForm = () => {
  const todoContext = useContext(TodoContext);

  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    todoContext.addTodo(value);
    setValue('');
  };

  return (
    <div>
      <form className='addForm' onSubmit={handleSubmit}>
        <input
          onChange={(e) => setValue(e.target.value)}
          type='text'
          placeholder='Add New Todo...'
          value={value}
        />
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddForm;
