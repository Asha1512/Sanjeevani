const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  contact: String,
  age: Number,
  bloodGroup: String,
  address: String,
  organs: [String]
});

module.exports = mongoose.model('Donor', donorSchema);