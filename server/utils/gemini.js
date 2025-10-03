const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractJsonFromMarkdown = (text) => {
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  return match ? match[1] : text;
};

const generateQuestions = async (resumeText) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Based on the following resume, generate 6 interview questions (2 easy, 2 medium, 2 hard). Return the questions in a JSON array of objects, where each object has a "question" and "difficulty" field (Easy, Medium, or Hard).

Resume:
${resumeText}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  const cleanedText = extractJsonFromMarkdown(text);
  return JSON.parse(cleanedText);
};

const evaluateAnswer = async (question, answer) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Evaluate the following answer to the interview question. Provide a score from 0 to 10 and brief feedback. Return the result as a JSON object with "score" and "feedback" fields.

Question: ${question}
Answer: ${answer}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  const cleanedText = extractJsonFromMarkdown(text);
  return JSON.parse(cleanedText);
};

const generateSummary = async (candidate) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Based on the following interview data, generate a summary of the candidate's performance. The data includes the questions, answers, scores, and feedback.

Candidate Name: ${candidate.name}
Resume Text: ${candidate.resumeText}

Interview Performance:
${candidate.questions
  .map(
    (q) =>
      `Question: ${q.question}\nAnswer: ${q.answer}\nScore: ${q.score}\nFeedback: ${q.feedback}`
  )
  .join("\n\n")}

Final Score: ${candidate.finalScore}

Summary:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

module.exports = { generateQuestions, evaluateAnswer, generateSummary };
