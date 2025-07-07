const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  items: [{
    bookId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    type: { type: String, required: true, enum: ['buy', 'borrow'] },
    price: { type: Number, required: true },
    image: { type: String, required: true }
  }],
  date: { type: Date, required: true },
  reference: { type: String, required: true },
  status: { type: String, required: true, enum: ['completed', 'pending', 'failed'] },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
}, {
  _id: false,
  versionKey: false
});

// Transform the output to match the expected structure
transactionSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
