const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
  broughtBooks: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    pdfUrl: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    transactionRef: { type: String, required: true },
    type: { type: String, required: true, enum: ['bought'] },
    status: { type: String, required: true, enum: ['purchased'] }
  }],
  borrowedBooks: [{ type: mongoose.Schema.Types.Mixed }],
  transactionHistory: [{
    id: { type: String, required: true },
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
  }],
  comments: [{ type: mongoose.Schema.Types.Mixed }],
  appointments: [{
    subject: { type: String, required: true },
    details: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    userId: { type: String, required: true },
    id: { type: String, required: true },
    createdAt: { type: Date, required: true }
  }],
  updatedAt: { type: Date, default: Date.now },
  cart: [{ type: mongoose.Schema.Types.Mixed }]
}, {
  _id: false,
  versionKey: false
});

// Transform the output to match the expected structure
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
