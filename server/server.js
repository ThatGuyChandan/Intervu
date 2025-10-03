const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const resumeRoutes = require('./routes/resumeRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
app.use('/api', resumeRoutes);
app.use('/api', interviewRoutes);
app.use('/api', candidateRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
