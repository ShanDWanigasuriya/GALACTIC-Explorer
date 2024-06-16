const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const spaceCollectionRoutes = require('./routes/spaceCollectionRoutes'); // Import spaceCollectionRoutes

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

app.use(express.json());
app.use(cors());

// Use authRoutes for authentication endpoints
app.use(authRoutes);

// Use spaceCollectionRoutes for space image collection endpoints
app.use(spaceCollectionRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
