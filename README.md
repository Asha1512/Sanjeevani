## **Sanjeevani** – Organ Donation Platform

**Sanjeevani** is a full-stack web application designed to raise awareness about organ donation and support patients in need. It provides a platform for users to register as donors, request organs, seek financial support, and contribute towards life-saving treatments.

##  Features

- Donor Registration Form  
- Organ Request Submission with Document Upload  
- Financial Support Section (Donation Cards + Payment Modal)  
- Awareness Page with Myths vs Facts & FAQs  
- Contact Form with Email/Phone Support Details  
- User Login with Session Handling (LocalStorage)  
- Admin Dashboard (for approving requests manually from DB)
  
##  Tech Stack

- **Frontend**: HTML, CSS, Bootstrap, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas
 
## Folder Structure
```
Sanjeevani/
├── models/             # Mongoose Models (User, Donor, Request)
├── public/             # Frontend Files (HTML, CSS, Images)
│   ├── css/
│   ├── images/
│   └── *.html
├── uploads/            # Uploaded docs (excluded in .gitignore)
├── .env                # Environment variables (not uploaded)
├── .gitignore
├── authRoutes.js       # Authentication routes
├── donorRoutes.js      # Donor-related routes
├── requestRoutes.js    # Organ request routes
├── db.js               # MongoDB connection setup
├── server.js           # Express Server
├── package.json
```
