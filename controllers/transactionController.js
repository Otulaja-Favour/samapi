const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Book = require('../models/Book');

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transactions by user ID
const getTransactionsByUserId = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new transaction
const createTransaction = async (req, res) => {
  try {
    const { userId, items, type = 'buy' } = req.body;

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    // Generate transaction ID and reference
    const transactionId = `tx_${Date.now()}`;
    const reference = `ORDER_${Date.now()}_${userId}`;

    const transaction = new Transaction({
      _id: transactionId,
      userId,
      totalAmount,
      items,
      date: new Date(),
      reference,
      status: 'completed',
      metadata: {}
    });

    const savedTransaction = await transaction.save();

    // Update user's transaction history and purchased/borrowed books
    const user = await User.findOne({ _id: userId });
    if (user) {
      // Add to transaction history
      user.transactionHistory.push(savedTransaction.toJSON());

      // Add to appropriate books array
      for (const item of items) {
        if (item.type === 'buy') {
          const book = await Book.findOne({ _id: item.bookId });
          if (book) {
            user.broughtBooks.push({
              id: item.bookId,
              title: item.title,
              author: item.author,
              image: item.image,
              price: item.price,
              pdfUrl: book.pdfUrl,
              purchaseDate: new Date(),
              transactionRef: reference,
              type: 'bought',
              status: 'purchased'
            });
          }
        } else if (item.type === 'borrow') {
          const book = await Book.findOne({ _id: item.bookId });
          if (book) {
            user.borrowedBooks.push({
              id: item.bookId,
              title: item.title,
              author: item.author,
              image: item.image,
              price: item.price,
              pdfUrl: book.pdfUrl,
              borrowDate: new Date(),
              transactionRef: reference,
              type: 'borrowed',
              status: 'active'
            });
          }
        }
      }

      user.updatedAt = new Date();
      await user.save();
    }

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
  getTransactionsByUserId,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
