const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  _id: false,
  versionKey: false
});

// Transform the output to match the expected structure
commentSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Comment', commentSchema);
