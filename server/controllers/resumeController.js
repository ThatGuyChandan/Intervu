const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const Candidate = require('../models/Candidate');

const extractInfo = (text) => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\d{3}[-.]?\d{3}[-.]?\d{4})/;

  const email = text.match(emailRegex);
  const phone = text.match(phoneRegex);

  // A simple attempt to get the name from the first line.
  const name = text.split('\n')[0].trim();

  return {
    name: name || null,
    email: email ? email[0] : null,
    phone: phone ? phone[0] : null,
  };
};

exports.uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    let text = '';
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdf(req.file.buffer);
      text = data.text;
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const { value } = await mammoth.extractRawText({ buffer: req.file.buffer });
      text = value;
    } else {
      return res.status(400).json({ message: 'Unsupported file type' });
    }

    const { name, email, phone } = extractInfo(text);

    const candidate = new Candidate({
      name,
      email,
      phone,
      resumeText: text,
    });

    await candidate.save();

    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!phone) missingFields.push('phone');

    res.status(201).json({
      message: 'Candidate created successfully',
      candidateId: candidate._id,
      missingFields,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
