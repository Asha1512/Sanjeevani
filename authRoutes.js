const express = require('express');
const router = express.Router();
const User = require('./models/User');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log("📩 Register route hit with data:", { name, email, password });
  
    try {
      const existing = await User.findOne({ email });
      if (existing) {
        console.log("❌ Email already registered:", email);
        return res.status(400).json({ message: "Email already registered" });
      }
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      req.session.user = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      };
  
      console.log("✅ User registered & session created:", newUser.name);
      res.status(201).json({ message: "Registered and logged in", name: newUser.name });
    } catch (err) {
      console.error("💥 Error during registration:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("🔑 Login route hit with data:", { email, password });

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      console.log("❌ Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ User login successful:", user.name);
    res.status(200).json({ message: "Login successful", name: user.name });
  } catch (err) {
    console.error("💥 Error during login:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;