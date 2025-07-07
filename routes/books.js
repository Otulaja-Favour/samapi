const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  serveFile
} = require('../controllers/bookController');

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', getBooks);

// @route   GET /api/books/search
// @desc    Search books
// @access  Public
router.get('/search', searchBooks);

// @route   GET /api/books/:id
// @desc    Get book by ID
// @access  Public
router.get('/:id', getBookById);

// @route   POST /api/books
// @desc    Create new book (with optional PDF file upload)
// @access  Public
router.post('/', upload.single('pdfFile'), createBook);

// Note: File serving is handled by server.js static middleware

// @route   PUT /api/books/:id
// @desc    Update book
// @access  Public
router.put('/:id', updateBook);

// @route   DELETE /api/books/:id
// @desc    Delete book
// @access  Public
router.delete('/:id', deleteBook);

module.exports = router;
