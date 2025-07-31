const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  patientFirstName: String,
  patientLastName: String,
  patientAge: Number,
  patientGender: String,
  patientBloodGroup: String,
  patientCity: String,
  requiredOrgan: String,
  urgencyLevel: String,
  medicalCondition: String,
  currentHospital: String,
  guardianName: String,
  relation: String,
  contactNumber: String,
  emailId: String,
  contactAddress: String,
  documents: [String], 
  status: { type: String, default: 'Pending' },
  needSupport: Boolean,
  amountRequired: Number,
  raisedAmount: { type: Number, default: 0 },
  timeLeft: Number,
  supportReason: String
});

module.exports = mongoose.model('Request', requestSchema);