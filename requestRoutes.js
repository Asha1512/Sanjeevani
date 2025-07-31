const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Request = require('./models/Request');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/requests');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/submit-request', upload.array('medicalDocuments', 5), async (req, res) => {
    try {
      const {
        patientFirstName, patientLastName, patientAge, patientGender, patientBloodGroup, patientCity,
        requiredOrgan, urgencyLevel, medicalCondition, currentHospital,
        guardianName, relation, contactNumber, emailId, contactAddress,
        needSupport, amountRequired, timeLeft, supportReason
      } = req.body;
  
      const fileNames = req.files.map(file => file.filename);
  
      const requestData = {
        patientFirstName, patientLastName, patientAge, patientGender, patientBloodGroup, patientCity,
        requiredOrgan, urgencyLevel, medicalCondition, currentHospital,
        guardianName, relation, contactNumber, emailId, contactAddress,
        documents: fileNames,
        status: "Pending",
        needSupport: needSupport === 'on',
      };
  
      if (needSupport === 'on') {
        requestData.amountRequired = amountRequired;
        requestData.timeLeft = timeLeft;
        requestData.supportReason = supportReason;
      }
  
      const request = new Request(requestData);
      await request.save();
  
      console.log("✅ Request submitted:", request);
      res.send(`<script>alert('Request submitted successfully!'); window.location.href = '/home.html';</script>`);
    } catch (err) {
      console.error("❌ Error submitting request:", err.message);
      res.status(500).send("Server error");
    }
  });

router.get('/admin/requests', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post('/admin/approve/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    await Request.findByIdAndUpdate(requestId, { status: 'Approved' });
    res.json({ message: "Request approved" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get('/support/approved', async (req, res) => {
    try {
      const supportRequests = await Request.find({
        status: 'Approved',
        needSupport: true
      });
      res.json(supportRequests);
    } catch (err) {
      console.error("❌ Error fetching support data:", err.message);
      res.status(500).send("Server error");
    }
  });
router.post('/support/donate/:id', async (req, res) => {
    try {
      const requestId = req.params.id;
      const { amount } = req.body;
  
      if (!amount || isNaN(amount)) {
        return res.status(400).json({ message: "Invalid donation amount" });
      }
  
      const request = await Request.findById(requestId);
      if (!request) return res.status(404).json({ message: "Request not found" });
  
      if (!request.raisedAmount) request.raisedAmount = 0;
  
      request.raisedAmount += Number(amount);
      await request.save();
  
      res.json({ message: "Donation successful" });
    } catch (err) {
      console.error("❌ Error processing donation:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports = router;