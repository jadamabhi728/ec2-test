const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 1: GET - Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API 2: GET - Get Users
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// API 3: POST - Create User
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// API 4: GET - Get User by ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  // Sample user data
  const user = {
    id: parseInt(id),
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date().toISOString()
  };

  res.json({
    success: true,
    data: user
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to abhishekh pipeline divyanshu sir ========',
    endpoints: {
      'GET /api/health': 'Health check endpoint',
      'GET /api/users': 'Get all users',
      'POST /api/users': 'Create a new user',
      'GET /api/users/:id': 'Get user by ID'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET  /api/health`);
  console.log(`  GET  /api/users`);
  console.log(`  POST /api/users`);
  console.log(`  GET  /api/users/:id`);
});

