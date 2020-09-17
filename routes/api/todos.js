const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Todo = require('../../models/Todo');
const User = require('../../models/User');

// @route     GET api/todos
// @desc      Get all todos from logged in user
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/todos
// @desc      Create NEW Todo
// @access    Public
router.post('/', auth, async (req, res) => {
  try {
    let { text } = req.body;
    const newTodo = await Todo.create({ text, user: req.user.id });
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/todos/:id
// @desc      Update Todo
// @access    Public
router.put('/:id', auth, async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check to see if a todo which is going to be deleted exists.
    let todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });

    // Make sure logged in user owns this todo.
    if (todo.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ msg: 'You do not have permission to do that' });
    }

    await Todo.findByIdAndRemove(req.params.id);
    res.json('Todo Deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
