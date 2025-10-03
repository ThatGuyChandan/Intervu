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
    const newScore = isNaN(score) ? 0 : score;

    const updatedQuestions = candidate.questions.map((q, index) => {
      if (index === questionIndex) {
        return { ...q, answer, score: newScore, feedback: evaluation.feedback };
      }
      return q;
    });

    candidate.questions = updatedQuestions;

    if (questionIndex === candidate.questions.length - 1) {
      const totalScore = candidate.questions.reduce((acc, q) => acc + (q.score ?? 0), 0);
      candidate.totalScore = totalScore;
      if (candidate.questions.length > 0) {
        candidate.finalScore = Math.round((totalScore / (candidate.questions.length * 10)) * 100);
      } else {
        candidate.finalScore = 0;
      }
      const summary = await generateSummary(candidate);
      candidate.summary = summary;
      await candidate.save();
      return res.json(candidate);
    }

    await candidate.save();

    res.json({ evaluation });
  } catch (error) {
    console.error(error);
    if (error.message.includes('API quota')) {
      return res.status(429).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
