const express = require('express');
const router = express.Router();
const {
  getAllCandidates,
  getCandidateById,
} = require('../controllers/candidateController');

router.get('/candidates', getAllCandidates);
router.get('/candidates/:id', getCandidateById);

module.exports = router;
