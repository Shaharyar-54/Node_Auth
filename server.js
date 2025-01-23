// console.log("MongoDB URL:", process.env.DB_URL);


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
// mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));


mongoose.connect(process.env.DB_URL, {
    // ssl: true,
    // tlsInsecure: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout to avoid hanging issues
}).then(() => {
    console.log("Connected to MongoDB successfully!");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
