const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume } = require('../controllers/resumeController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadResume', upload.single('resume'), uploadResume);

module.exports = router;
