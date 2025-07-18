const Book = require('../models/Book');
const path = require('path');
const fs = require('fs');

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new book
const createBook = async (req, res) => {
  try {
    const { title, author, description, price, image, rent } = req.body;
    
    // Generate book ID
    const bookId = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Handle PDF file upload
    let pdfUrl = '';
    if (req.file) {
      // File was uploaded, create URL to serve the file
      pdfUrl = `${req.protocol}://${req.get('host')}/api/files/${req.file.filename}`;
    } else if (req.body.pdfUrl) {
      // URL was provided instead of file
      pdfUrl = req.body.pdfUrl;
    }
    
    const book = new Book({
      _id: bookId,
      title,
      author,
      description,
      price,
      image,
      rent,
      pdfUrl,
      dateAdded: new Date().toISOString().split('T')[0],
      comments: []
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search books
const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Serve uploaded PDF files
const serveFile = (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  serveFile
};
