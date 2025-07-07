const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const seedData = require('./utils/seedData');

// Load environment variables
dotenv.config();

// Connect to database (with error handling)
connectDB().catch(err => {
  console.log('MongoDB connection failed, running without database:', err.message);
});

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/books', require('./routes/books'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/comments', require('./routes/comments'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Book Library API is running!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Seed data endpoint (for development)
app.post('/api/seed', async (req, res) => {
  try {
    await seedData();
    res.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Book Library API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      books: '/api/books',
      transactions: '/api/transactions',
      appointments: '/api/appointments',
      comments: '/api/comments',
      health: '/api/health',
      seed: '/api/seed (POST)'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'GET /api/users',
      'GET /api/books',
      'GET /api/transactions',
      'GET /api/appointments',
      'GET /api/comments'
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API documentation: http://localhost:${PORT}/`);
});
