const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  resumeText: {
    type: String,
  },
  questions: [
    {
      question: String,
      difficulty: String,
      answer: String,
      score: Number,
      feedback: String,
    },
  ],
  finalScore: {
    type: Number,
  },
  totalScore: {
    type: Number,
  },
  summary: {
    type: String,
  },
});

module.exports = mongoose.model('Candidate', CandidateSchema);
