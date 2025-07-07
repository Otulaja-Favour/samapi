const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getTransactionById,
  getTransactionsByUserId,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Public
router.get('/', getTransactions);

// @route   GET /api/transactions/:id
// @desc    Get transaction by ID
// @access  Public
router.get('/:id', getTransactionById);

// @route   GET /api/transactions/user/:userId
// @desc    Get transactions by user ID
// @access  Public
router.get('/user/:userId', getTransactionsByUserId);

// @route   POST /api/transactions
// @desc    Create new transaction
// @access  Public
router.post('/', createTransaction);

// @route   PUT /api/transactions/:id
// @desc    Update transaction
// @access  Public
router.put('/:id', updateTransaction);

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Public
router.delete('/:id', deleteTransaction);

module.exports = router;
