const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractJsonFromMarkdown = (text) => {
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  return match ? match[1] : text;
};

const generateQuestions = async (resumeText) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Based on the following resume, generate 6 interview questions (2 easy, 2 medium, 2 hard). Return the questions in a JSON array of objects, where each object has a "question" and "difficulty" field (Easy, Medium, or Hard).

Resume:
${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const cleanedText = extractJsonFromMarkdown(text);
    return JSON.parse(cleanedText);
  } catch (error) {
    if (error.status === 429) {
      throw new Error('You have exceeded your API quota. Please check your plan and billing details.');
    }
    throw error;
  }
};

const evaluateAnswer = async (question, answer) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Evaluate the following answer to the interview question. Provide a score from 0 to 10 and brief feedback. Return the result as a JSON object with "score" and "feedback" fields.

Question: ${question}
Answer: ${answer}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const cleanedText = extractJsonFromMarkdown(text);
    return JSON.parse(cleanedText);
  } catch (error) {
    if (error.status === 429) {
      throw new Error('You have exceeded your API quota. Please check your plan and billing details.');
    }
    throw error;
  }
};

const generateSummary = async (candidate) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate a concise and structured summary of the candidate's performance based on the following interview data. Do not include any introductory phrases or preamble.

    The summary must include the following sections:
    - **Overall Performance:** A brief, one-sentence overview of the candidate's performance.
    - **Strengths:** A bulleted list of 2-3 key strengths.
    - **Areas for Improvement:** A bulleted list of 2-3 key areas for improvement.
    - **Conclusion:** A brief, one-sentence concluding statement about the candidate's suitability for the role.

    Candidate Name: ${candidate.name}
    Resume Text: ${candidate.resumeText}

    Interview Performance:
    ${candidate.questions
      .map(
        (q) =>
          `Question: ${q.question}\nAnswer: ${q.answer}\nScore: ${q.score ?? 0}\nFeedback: ${q.feedback}`
      )
      .join("\n\n")}

    Final Score: ${candidate.finalScore}

    Summary:`

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    if (error.status === 429) {
      throw new Error('You have exceeded your API quota. Please check your plan and billing details.');
    }
    throw error;
  }
};

module.exports = { generateQuestions, evaluateAnswer, generateSummary };