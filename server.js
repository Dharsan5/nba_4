require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const User = require('./models/User');
const Contact = require('./models/Contact');
const Subscriber = require('./models/Subscriber');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB Atlas
connectDB();

// API Routes

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const {
      name, email, phone, password, bloodgroup, gender,
      birthdate, weight, state, zipcode, district, area, landmark
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name, email, phone, password: hashedPassword, bloodgroup, gender,
      birthdate, weight, state, zipcode, district, area, landmark
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'Registration successful!', user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Incorrect email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect email or password' });
    }

    res.json({ success: true, message: 'Login successful', user: { name: user.name, email: user.email, bloodgroup: user.bloodgroup } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Search Donors endpoint
app.get('/api/donors', async (req, res) => {
  try {
    const { bloodgroup, state, district } = req.query;
    let query = {};
    if (bloodgroup) query.bloodgroup = bloodgroup;
    if (state) query.state = new RegExp(state, 'i');
    if (district) query.district = new RegExp(district, 'i');

    const donors = await User.find(query, '-password');
    res.json({ success: true, count: donors.length, donors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Contact Submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.json({ success: true, message: 'Contact message received successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Subscribe / Response Back endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ success: true, message: 'Already subscribed!' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Catch-all route to serve main page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
