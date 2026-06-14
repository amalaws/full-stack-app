// Frontend - Todo Application
class TodoApp {
    constructor() {
        this.todos = [];
        this.apiUrl = 'http://localhost:5000/api';
        this.init();
    }

    async init() {
        this.render();
        await this.loadTodos();
        this.attachEventListeners();
    }

    render() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <div class="container">
                <h1>📝 Todo Application</h1>
                <div class="input-group">
                    <input type="text" id="todoInput" placeholder="Add a new todo..." />
                    <button id="addBtn">Add Todo</button>
                </div>
                <ul class="todo-list" id="todoList"></ul>
                <div class="stats">
                    <div class="stat">
                        <div class="stat-number" id="totalCount">0</div>
                        <div class="stat-label">Total</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number" id="completedCount">0</div>
                        <div class="stat-label">Completed</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number" id="pendingCount">0</div>
                        <div class="stat-label">Pending</div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
    }

    async loadTodos() {
        try {
            const response = await fetch(`${this.apiUrl}/todos`);
            if (!response.ok) throw new Error('Failed to fetch todos');
            this.todos = await response.json();
            this.renderTodos();
        } catch (error) {
            console.error('Failed to load todos:', error);
            alert('Failed to load todos. Make sure backend server is running on localhost:5000');
        }
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = this.todos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <span class="todo-text">${this.escapeHtml(todo.title)}</span>
                <div class="todo-actions">
                    <button class="btn-small btn-complete" onclick="app.toggleTodo('${todo._id}')">✓</button>
                    <button class="btn-small btn-delete" onclick="app.deleteTodo('${todo._id}')">✕</button>
                </div>
            </li>
        `).join('');
        this.updateStats();
    }

    async addTodo() {
        const input = document.getElementById('todoInput');
        const title = input.value.trim();
        if (!title) {
            alert('Please enter a todo title');
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            
            if (!response.ok) throw new Error('Failed to add todo');
            
            const newTodo = await response.json();
            this.todos.push(newTodo);
            input.value = '';
            this.renderTodos();
        } catch (error) {
            console.error('Failed to add todo:', error);
            alert('Failed to add todo');
        }
    }

    async toggleTodo(id) {
        try {
            const response = await fetch(`${this.apiUrl}/todos/${id}/toggle`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!response.ok) throw new Error('Failed to toggle todo');
            
            const updated = await response.json();
            const index = this.todos.findIndex(t => t._id === id);
            this.todos[index] = updated;
            this.renderTodos();
        } catch (error) {
            console.error('Failed to toggle todo:', error);
            alert('Failed to toggle todo');
        }
    }

    async deleteTodo(id) {
        if (!confirm('Are you sure you want to delete this todo?')) return;
        
        try {
            const response = await fetch(`${this.apiUrl}/todos/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete todo');
            
            this.todos = this.todos.filter(t => t._id !== id);
            this.renderTodos();
        } catch (error) {
            console.error('Failed to delete todo:', error);
            alert('Failed to delete todo');
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;
        document.getElementById('totalCount').textContent = total;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('pendingCount').textContent = pending;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TodoApp();
});
