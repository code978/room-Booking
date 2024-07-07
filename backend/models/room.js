const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  date: String,
  slots: [{
    time: String,
    booked: { type: Boolean, default: false }
  }]
});

const roomSchema = new mongoose.Schema({
  name: String,
  features: [String],
  capacity: Number,
  timeSlots: [timeSlotSchema]
});

module.exports = mongoose.model('Room', roomSchema);
