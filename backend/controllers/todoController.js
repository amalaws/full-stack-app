// Controllers - Request Handlers
const todoService = require('../services/todoService');

class TodoController {
    /**
     * Get all todos
     */
    async getAllTodos(req, res) {
        try {
            const filters = {
                completed: req.query.completed === 'true' ? true : undefined,
                priority: req.query.priority
            };
            const todos = await todoService.getAllTodos(filters);
            res.json(todos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Get single todo
     */
    async getTodoById(req, res) {
        try {
            const todo = await todoService.getTodoById(req.params.id);
            res.json(todo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * Create new todo
     */
    async createTodo(req, res) {
        try {
            const todo = await todoService.createTodo(req.body);
            res.status(201).json(todo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Update todo
     */
    async updateTodo(req, res) {
        try {
            const todo = await todoService.updateTodo(req.params.id, req.body);
            res.json(todo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Delete todo
     */
    async deleteTodo(req, res) {
        try {
            const todo = await todoService.deleteTodo(req.params.id);
            res.json({ message: 'Todo deleted successfully', todo });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * Toggle todo completion
     */
    async toggleTodo(req, res) {
        try {
            const todo = await todoService.toggleTodo(req.params.id);
            res.json(todo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * Get statistics
     */
    async getStats(req, res) {
        try {
            const stats = await todoService.getStats();
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TodoController();
