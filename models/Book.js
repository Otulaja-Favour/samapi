const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  rent: { type: Number, required: true },
  pdfUrl: { type: String, required: true },
  dateAdded: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.Mixed }]
}, {
  _id: false,
  versionKey: false
});

// Transform the output to match the expected structure
bookSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Book', bookSchema);
