const express = require('express');
const router = express.Router();
const {
  getAllCandidates,
  getCandidateById,
  updateCandidate,
} = require('../controllers/candidateController');

router.get('/candidates', getAllCandidates);
router.get('/candidates/:id', getCandidateById);
router.put('/candidates/:id', updateCandidate);

module.exports = router;
