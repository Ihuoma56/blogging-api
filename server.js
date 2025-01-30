const express = require('express');
const rateLimiter = require('express-rate-limit');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const connectMongoDB = require('./db')
dotenv.config();

const app = express();

const limiter = rateLimiter({
    windowMs : 1 * 60 * 1000,
    limit : 2,
    message : {message : 'too many requests'},
})

app.use(bodyParser.json());
connectMongoDB(); 
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => console.log(`Server is running on port ${PORT}`));

