const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateQuestions = async (resumeText) => {
  const prompt = `Based on the following resume, generate 6 interview questions (2 easy, 2 medium, 2 hard). Return the questions in a JSON array of objects, where each object has a "question" and "difficulty" field (Easy, Medium, or Hard).

Resume:
${resumeText}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content);
};

const evaluateAnswer = async (question, answer) => {
  const prompt = `Evaluate the following answer to the interview question. Provide a score from 0 to 10 and brief feedback. Return the result as a JSON object with "score" and "feedback" fields.

Question: ${question}
Answer: ${answer}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  });

  return JSON.parse(response.choices[0].message.content);
};

const generateSummary = async (candidate) => {
  const prompt = `Based on the following interview data, generate a summary of the candidate's performance. The data includes the questions, answers, scores, and feedback.

Candidate Name: ${candidate.name}
Resume Text: ${candidate.resumeText}

Interview Performance:
${candidate.questions
  .map(
    (q) =>
      `Question: ${q.question}\nAnswer: ${q.answer}\nScore: ${q.score}\nFeedback: ${q.feedback}`
  )
  .join('\n\n')}

Final Score: ${candidate.finalScore}

Summary:`

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};

module.exports = { generateQuestions, evaluateAnswer, generateSummary };
