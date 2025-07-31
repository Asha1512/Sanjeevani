const express = require('express');
const router = express.Router();
const Donor = require('./models/Donor');

router.post('/register-donor', async (req, res) => {
  try {
    const { firstName, lastName, email, contact, age, bloodGroup, address, organs } = req.body;

    const donor = new Donor({
      firstName,
      lastName,
      email,
      contact,
      age,
      bloodGroup,
      address,
      organs: Array.isArray(organs) ? organs : [organs]
    });

    await donor.save();
    console.log("✅ Donor registered:", donor);

    res.status(201).json({ message: "Donor registered successfully" });
  } catch (err) {
    console.error("❌ Error registering donor:", err.message);

    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;