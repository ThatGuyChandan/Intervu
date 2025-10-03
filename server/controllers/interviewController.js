const Candidate = require('../models/Candidate');
const {
  generateQuestions,
  evaluateAnswer,
  generateSummary,
} = require('../utils/gemini');

exports.startInterview = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const questions = await generateQuestions(candidate.resumeText);
    candidate.questions = questions;
    await candidate.save();

    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { questionIndex, answer } = req.body;
    const candidate = await Candidate.findById(req.params.candidateId);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const question = candidate.questions[questionIndex];
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const evaluation = await evaluateAnswer(question.question, answer);

    // Ensure evaluation.score is a number
    const score = Number(evaluation.score);
    candidate.questions[questionIndex].score = isNaN(score) ? 0 : score;

    candidate.questions[questionIndex].answer = answer;
    candidate.questions[questionIndex].feedback = evaluation.feedback;

    if (questionIndex === candidate.questions.length - 1) {
      const totalScore = candidate.questions.reduce((acc, q) => acc + q.score, 0);
      if (candidate.questions.length > 0) {
        candidate.finalScore = totalScore / candidate.questions.length;
      } else {
        candidate.finalScore = 0;
      }
      const summary = await generateSummary(candidate);
      candidate.summary = summary;
    }

    await candidate.save();

    res.json({ evaluation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
