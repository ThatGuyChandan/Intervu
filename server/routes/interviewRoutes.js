const express = require('express');
const router = express.Router();
const {
  startInterview,
  submitAnswer,
} = require('../controllers/interviewController');

router.post('/startInterview/:candidateId', startInterview);
router.post('/submitAnswer/:candidateId', submitAnswer);

module.exports = router;
