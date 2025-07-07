const Comment = require('../models/Comment');

// Get all comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comment by ID
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments by book ID
const getCommentsByBookId = async (req, res) => {
  try {
    const comments = await Comment.find({ bookId: req.params.bookId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments by user ID
const getCommentsByUserId = async (req, res) => {
  try {
    const comments = await Comment.find({ userId: req.params.userId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new comment
const createComment = async (req, res) => {
  try {
    const { userId, bookId, content, rating } = req.body;

    // Generate comment ID
    const commentId = `comment_${Date.now()}`;

    const comment = new Comment({
      _id: commentId,
      userId,
      bookId,
      content,
      rating,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update comment
const updateComment = async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getComments,
  getCommentById,
  getCommentsByBookId,
  getCommentsByUserId,
  createComment,
  updateComment,
  deleteComment
};
