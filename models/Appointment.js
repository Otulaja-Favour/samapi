const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  subject: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true }
}, {
  _id: false,
  versionKey: false
});

// Transform the output to match the expected structure
appointmentSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
