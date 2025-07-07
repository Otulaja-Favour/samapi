const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userController');

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get('/', getUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', getUserById);

// @route   POST /api/users
// @desc    Create new user
// @access  Public
router.post('/', createUser);

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Public
router.put('/:id', updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Public
router.delete('/:id', deleteUser);

module.exports = router;
