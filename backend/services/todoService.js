// Service Layer - Business Logic
const Todo = require('../models/Todo');

class TodoService {
    /**
     * Get all todos with optional filtering
     * @param {Object} filters - Filter criteria (completed, priority, etc.)
     * @returns {Promise<Array>} Array of todos
     */
    async getAllTodos(filters = {}) {
        try {
            const query = {};
            if (filters.completed !== undefined) query.completed = filters.completed;
            if (filters.priority) query.priority = filters.priority;
            
            const todos = await Todo.find(query).sort({ createdAt: -1 });
            return todos;
        } catch (error) {
            throw new Error(`Error fetching todos: ${error.message}`);
        }
    }

    /**
     * Get a single todo by ID
     * @param {String} id - Todo ID
     * @returns {Promise<Object>} Todo object
     */
    async getTodoById(id) {
        try {
            const todo = await Todo.findById(id);
            if (!todo) throw new Error('Todo not found');
            return todo;
        } catch (error) {
            throw new Error(`Error fetching todo: ${error.message}`);
        }
    }

    /**
     * Create a new todo
     * @param {Object} todoData - Todo data (title, priority, dueDate, etc.)
     * @returns {Promise<Object>} Created todo
     */
    async createTodo(todoData) {
        try {
            // Validation
            if (!todoData.title || todoData.title.trim().length === 0) {
                throw new Error('Title is required and cannot be empty');
            }

            const todo = new Todo({
                title: todoData.title.trim(),
                priority: todoData.priority || 'medium',
                dueDate: todoData.dueDate,
                completed: false
            });

            await todo.save();
            return todo;
        } catch (error) {
            throw new Error(`Error creating todo: ${error.message}`);
        }
    }

    /**
     * Update a todo
     * @param {String} id - Todo ID
     * @param {Object} updateData - Data to update
     * @returns {Promise<Object>} Updated todo
     */
    async updateTodo(id, updateData) {
        try {
            const todo = await Todo.findByIdAndUpdate(
                id,
                { ...updateData, updatedAt: Date.now() },
                { new: true, runValidators: true }
            );

            if (!todo) throw new Error('Todo not found');
            return todo;
        } catch (error) {
            throw new Error(`Error updating todo: ${error.message}`);
        }
    }

    /**
     * Delete a todo
     * @param {String} id - Todo ID
     * @returns {Promise<Object>} Deleted todo
     */
    async deleteTodo(id) {
        try {
            const todo = await Todo.findByIdAndDelete(id);
            if (!todo) throw new Error('Todo not found');
            return todo;
        } catch (error) {
            throw new Error(`Error deleting todo: ${error.message}`);
        }
    }

    /**
     * Toggle todo completion status
     * @param {String} id - Todo ID
     * @returns {Promise<Object>} Updated todo
     */
    async toggleTodo(id) {
        try {
            const todo = await this.getTodoById(id);
            todo.completed = !todo.completed;
            await todo.save();
            return todo;
        } catch (error) {
            throw new Error(`Error toggling todo: ${error.message}`);
        }
    }

    /**
     * Get statistics
     * @returns {Promise<Object>} Statistics object
     */
    async getStats() {
        try {
            const total = await Todo.countDocuments();
            const completed = await Todo.countDocuments({ completed: true });
            const pending = total - completed;
            
            return {
                total,
                completed,
                pending,
                completionRate: total > 0 ? ((completed / total) * 100).toFixed(2) + '%' : '0%'
            };
        } catch (error) {
            throw new Error(`Error fetching stats: ${error.message}`);
        }
    }
}

module.exports = new TodoService();
