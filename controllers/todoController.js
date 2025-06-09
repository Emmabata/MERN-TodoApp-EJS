const Todo = require('../models/todoModel');

// Get all todos for the logged-in user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.render('todos', { todos });
  } catch (err) {
    res.status(500).send('Error loading todos');
  }
};

// Show form to create new todo
exports.showNewTodoForm = (req, res) => {
  res.render('new');
};

// Handle creation of new todo
exports.createTodo = async (req, res) => {
  const { task } = req.body;
  try {
    const todo = new Todo({ task, userId: req.user._id });
    await todo.save();
    res.redirect('/todos');
  } catch (err) {
    res.status(400).send('Failed to create todo');
  }
};

// Show edit form
exports.showEditTodoForm = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user._id });
    if (!todo) return res.status(404).send('Todo not found');
    res.render('edit', { todo });
  } catch (err) {
    res.status(500).send('Error loading edit form');
  }
};

// Handle update of todo
exports.updateTodo = async (req, res) => {
  const { task, completed } = req.body;
  try {
    await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { task, completed: completed === 'on', updatedAt: new Date() }
    );
    res.redirect('/todos');
  } catch (err) {
    res.status(400).send('Failed to update todo');
  }
};

// Toggle completion
exports.toggleTodoCompletion = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user._id });
    if (!todo) return res.status(404).send('Todo not found');

    todo.completed = !todo.completed;
    todo.updatedAt = new Date();
    await todo.save();

    res.redirect('/todos');
  } catch (err) {
    res.status(500).send('Failed to toggle completion');
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!todo) return res.status(404).send('Todo not found');
    res.redirect('/todos');
  } catch (err) {
    res.status(500).send('Failed to delete todo');
  }
};
