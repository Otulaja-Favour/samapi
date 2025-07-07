const express = require('express');
const router = express.Router();
const {
  getComments,
  getCommentById,
  getCommentsByBookId,
  getCommentsByUserId,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

// @route   GET /api/comments
// @desc    Get all comments
// @access  Public
router.get('/', getComments);

// @route   GET /api/comments/:id
// @desc    Get comment by ID
// @access  Public
router.get('/:id', getCommentById);

// @route   GET /api/comments/book/:bookId
// @desc    Get comments by book ID
// @access  Public
router.get('/book/:bookId', getCommentsByBookId);

// @route   GET /api/comments/user/:userId
// @desc    Get comments by user ID
// @access  Public
router.get('/user/:userId', getCommentsByUserId);

// @route   POST /api/comments
// @desc    Create new comment
// @access  Public
router.post('/', createComment);

// @route   PUT /api/comments/:id
// @desc    Update comment
// @access  Public
router.put('/:id', updateComment);

// @route   DELETE /api/comments/:id
// @desc    Delete comment
// @access  Public
router.delete('/:id', deleteComment);

module.exports = router;
