const connectDB = require('./db');
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
app.use(session({
    secret: 'sanjeevani-secret-key',
    resave: false,
    saveUninitialized: true
  }));
const authRoutes = require('./authRoutes');
const donorRoutes = require('./donorRoutes');
const requestRoutes = require('./requestRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.use('/api', authRoutes);
app.use('/', donorRoutes);
app.use('/', requestRoutes); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
};

startServer();