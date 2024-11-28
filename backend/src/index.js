const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/userRoutes'); 
const employeeRoutes = require('./api/routes/employeeRoutes'); 
require('dotenv').config(); 

const app = express();

app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
