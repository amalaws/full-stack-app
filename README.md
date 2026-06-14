# Full-Stack Todo Application

A complete full-stack application with:
- **Frontend**: Vanilla JavaScript with modern UI
- **Backend**: Node.js/Express API server
- **Service Layer**: Business logic implementation
- **Database**: MongoDB integration

## Project Structure

```
full-stack-app/
├── frontend/              # React-like frontend
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Styling
│   └── app.js             # Frontend logic
├── backend/               # Express server
│   ├── server.js          # Main server file
│   ├── package.json       # Dependencies
│   ├── .env.example       # Environment variables
│   ├── config/
│   │   └── database.js    # MongoDB config
│   ├── models/
│   │   └── Todo.js        # Todo schema
│   ├── services/
│   │   └── todoService.js # Business logic
│   ├── controllers/
│   │   └── todoController.js  # Request handlers
│   └── routes/
│       └── todoRoutes.js      # API endpoints
└── .gitignore             # Git ignore rules
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your MongoDB URI in .env
# MONGODB_URI=mongodb://localhost:27017/todoapp

# Start the server
npm run dev  # Development with nodemon
# or
npm start    # Production
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Open index.html in a browser
# Or use a local server (Python, Node, etc.)

# Using Python 3:
python -m http.server 8000

# Using Node (npx):
npx http-server
```

Access frontend on `http://localhost:8000` or `http://localhost:3000`

## API Endpoints

### Todo Operations

```
GET    /api/todos              # Get all todos
GET    /api/todos/:id          # Get single todo
POST   /api/todos              # Create new todo
PUT    /api/todos/:id          # Update todo
PUT    /api/todos/:id/toggle   # Toggle completion
DELETE /api/todos/:id          # Delete todo
GET    /api/todos/stats        # Get statistics
```

## Request/Response Examples

### Create Todo
```json
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "priority": "high",
  "dueDate": "2026-06-20"
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "completed": false,
  "priority": "high",
  "dueDate": "2026-06-20T00:00:00.000Z",
  "createdAt": "2026-06-14T10:30:00.000Z",
  "updatedAt": "2026-06-14T10:30:00.000Z"
}
```

### Update Todo
```json
PUT /api/todos/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "completed": true,
  "priority": "medium"
}
```

## Features

✅ Create, Read, Update, Delete todos
✅ Toggle completion status
✅ Filter by status and priority
✅ Real-time statistics
✅ Data validation
✅ Error handling
✅ CORS enabled
✅ MongoDB persistence
✅ RESTful API design
✅ Service layer architecture

## Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│         Frontend (JavaScript)       │
│     (UI Components & Events)        │
└──────────────┬──────────────────────┘
               │ HTTP Requests
               ▼
┌─────────────────────────────────────┐
│      Backend (Express.js)           │
│  ┌────────────────────────────────┐ │
│  │  Routes (API Endpoints)        │ │
│  └────────────┬───────────────────┘ │
│               │                     │
│  ┌────────────▼───────────────────┐ │
│  │ Controllers (Request Handlers) │ │
│  └────────────┬───────────────────┘ │
│               │                     │
│  ┌────────────▼───────────────────┐ │
│  │ Services (Business Logic)      │ │
│  └────────────┬───────────────────┘ │
│               │                     │
│  ┌────────────▼───────────────────┐ │
│  │ Models (Database Schema)       │ │
│  └────────────┬───────────────────┘ │
└───────────────┼────────────────────┘
                │ Database Operations
                ▼
        ┌──────────────────┐
        │    MongoDB       │
        └──────────────────┘
```

## Service Layer Benefits

- **Separation of Concerns**: Business logic separated from HTTP handling
- **Reusability**: Services can be used by multiple controllers
- **Testability**: Easy to unit test business logic
- **Maintainability**: Clear code organization
- **Scalability**: Easy to add new features

## Error Handling

The application includes:
- Input validation
- Try-catch blocks
- Meaningful error messages
- HTTP status codes
- Middleware error handlers

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todoapp
CORS_ORIGIN=http://localhost:8000
```

## Technologies Used

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- CORS
- Dotenv

## License

MIT

## Author

Your Name
