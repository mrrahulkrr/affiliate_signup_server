require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables loaded:', {
    WASABI_ACCESS_KEY: process.env.WASABI_ACCESS_KEY ? '****' : 'undefined',
    WASABI_SECRET_KEY: process.env.WASABI_SECRET_KEY ? '****' : 'undefined',
    WASABI_REGION: process.env.WASABI_REGION || 'undefined',
    WASABI_ENDPOINT: process.env.WASABI_ENDPOINT || 'undefined',
    WASABI_BUCKET: process.env.WASABI_BUCKET || 'undefined',
  });
});