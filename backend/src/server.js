const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./api/routes/authRoutes'); 
const employeeRoutes = require('./api/routes/employeeRoutes'); // Import the employee routes

dotenv.config();
console.log("Mongo URI:", process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/api/auth', authRoutes); // For authentication routes
app.use('/api', employeeRoutes); // Add the employee routes

// Database connection and default admin user setup
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to the database');
    await createDefaultAdminUser(); // Ensure default admin user is created
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });

// Function to create default admin user
const createDefaultAdminUser = async () => {
  try {
    const defaultUsername = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';

    // Check if default user exists
    const existingAdmin = await User.findOne({ username: defaultUsername });
    if (!existingAdmin) {
      const admin = new User({
        username: defaultUsername,
        password: defaultPassword, 
        role: 'admin', 
      });
      await admin.save();
      console.log('Default admin user created:', defaultUsername);
    } else {
      console.log('Default admin user already exists');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
