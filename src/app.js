const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Event Management API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

