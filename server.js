const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});
