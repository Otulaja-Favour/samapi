const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
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
// @desc    Create new book
// @access  Public
router.post('/', createBook);

// @route   PUT /api/books/:id
// @desc    Update book
// @access  Public
router.put('/:id', updateBook);

// @route   DELETE /api/books/:id
// @desc    Delete book
// @access  Public
router.delete('/:id', deleteBook);

module.exports = router;
