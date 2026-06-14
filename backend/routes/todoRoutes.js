// Routes - API Endpoints
const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

// GET Routes
router.get('/', todoController.getAllTodos);
router.get('/stats', todoController.getStats);
router.get('/:id', todoController.getTodoById);

// POST Routes
router.post('/', todoController.createTodo);

// PUT Routes
router.put('/:id', todoController.updateTodo);
router.put('/:id/toggle', todoController.toggleTodo);

// DELETE Routes
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
