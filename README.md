# Book Library Backend API

A complete Node.js backend API for a book library management system with user authentication, book management, transactions, appointments, and comments.

## Features

- **User Management**: Registration, login, profile management
- **Book Management**: CRUD operations for books, search functionality
- **Transaction Management**: Buy/borrow book transactions
- **Appointment Management**: Schedule and manage appointments
- **Comment System**: User reviews and ratings for books
- **Authentication**: JWT-based authentication
- **Database**: MongoDB with Mongoose ODM
- **Security**: Rate limiting, CORS, Helmet security headers

## Project Structure

```
database/
├── config/
│   └── database.js          # Database connection configuration
├── controllers/
│   ├── userController.js    # User-related business logic
│   ├── bookController.js    # Book-related business logic
│   ├── transactionController.js # Transaction management
│   ├── appointmentController.js # Appointment management
│   └── commentController.js # Comment management
├── middleware/
│   ├── auth.js             # Authentication middleware
│   └── errorHandler.js     # Global error handling
├── models/
│   ├── User.js             # User schema
│   ├── Book.js             # Book schema
│   ├── Transaction.js      # Transaction schema
│   ├── Appointment.js      # Appointment schema
│   └── Comment.js          # Comment schema
├── routes/
│   ├── users.js            # User routes
│   ├── books.js            # Book routes
│   ├── transactions.js     # Transaction routes
│   ├── appointments.js     # Appointment routes
│   └── comments.js         # Comment routes
├── utils/
│   └── seedData.js         # Database seeding utility
├── .env                    # Environment variables
├── server.js               # Main server file
└── package.json           # Dependencies and scripts
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/book-library
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Run the server:**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `POST /api/users/login` - Login user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `GET /api/books/search?query=term` - Search books
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `GET /api/transactions/user/:userId` - Get user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `GET /api/appointments/user/:userId` - Get user appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Comments
- `GET /api/comments` - Get all comments
- `GET /api/comments/:id` - Get comment by ID
- `GET /api/comments/book/:bookId` - Get book comments
- `GET /api/comments/user/:userId` - Get user comments
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Utility
- `GET /api/health` - Health check endpoint
- `POST /api/seed` - Seed database with sample data

## Sample Data

The API includes sample data seeding functionality. Send a POST request to `/api/seed` to populate the database with sample users, books, transactions, and appointments.

## Data Models

### User Model
- Personal information (name, email, phone)
- Authentication (password, role)
- Purchased books array
- Borrowed books array
- Transaction history
- Appointments
- Comments
- Cart items

### Book Model
- Book details (title, author, description)
- Pricing (purchase price, rental price)
- Media (image, PDF URL)
- Comments array

### Transaction Model
- Transaction details (amount, items, reference)
- Status tracking
- User association
- Metadata for additional information

### Appointment Model
- Appointment details (subject, details, date)
- Status tracking
- User association

### Comment Model
- Comment content and rating
- User and book association
- Timestamps

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- CORS enabled
- Helmet security headers
- Input validation

## Error Handling

The API includes comprehensive error handling:
- Database connection errors
- Validation errors
- Authentication errors
- 404 Not Found errors
- 500 Internal Server errors

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Environment Variables
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time

## Testing

Access the API at `http://localhost:5000` and visit:
- `http://localhost:5000/api/health` for health check
- `http://localhost:5000/` for API documentation

## License

This project is licensed under the ISC License.
