const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Please install and start MongoDB or use MongoDB Atlas');
    // Don't exit the process, let the server run without database
    return null;
  }
};

module.exports = connectDB;
