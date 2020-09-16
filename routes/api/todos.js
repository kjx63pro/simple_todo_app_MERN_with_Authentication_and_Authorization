const express = require('express');
const router = express.Router();

const Todo = require('../../models/Todo');

// @route     GET api/todos
// @desc      Get all todos
// @access    Public
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/todos
// @desc      Create NEW Todo
// @access    Public
router.post('/', async (req, res) => {
  try {
    let { text } = req.body;
    const newTodo = await Todo.create({ text });
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/todos/:id
// @desc      Update Todo
// @access    Public
router.put('/:id', async (req, res) => {
  try {
    const updateTodo = await Todo.findById(req.params.id);
    await Todo.findByIdAndUpdate(req.params.id, {
      isCompleted: !updateTodo.isCompleted,
    });
    res.json(updateTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/todos/:id
// @desc      Create NEW Todo
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    res.json('Todo Deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
