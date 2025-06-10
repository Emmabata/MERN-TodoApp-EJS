const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const todoController = require('../controllers/todoController');

// View all todos
router.get('/todos', authenticateJWT, todoController.getTodos);

// New todo form
router.get('/todos/new', authenticateJWT, todoController.showNewTodoForm);

// Create new todo
router.post('/todos/new', authenticateJWT, todoController.createTodo);

// Edit form for a specific todo
router.get('/todos/edit/:id', authenticateJWT, todoController.showEditTodoForm);

// Update a todo
router.post('/todos/edit/:id', authenticateJWT, todoController.updateTodo);

// Toggle complete status
router.post('/todos/complete/:id', authenticateJWT, todoController.toggleTodoCompletion);

// Delete a todo
router.post('/todos/delete/:id', authenticateJWT, todoController.deleteTodo);

module.exports = router;
