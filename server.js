const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const connectMongoDB = require('./db')
dotenv.config();

const app = express();
app.use(bodyParser.json());
connectMongoDB(); 
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => console.log(`Server is running on port ${PORT}`));

