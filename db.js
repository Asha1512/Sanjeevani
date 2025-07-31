const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected to Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

module.exports = connectDB;