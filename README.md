# Smart Interview

AI-powered interview assistant.

## Project Structure

- `/client`: React app (Vite + Redux Toolkit + redux-persist + Ant Design)
- `/server`: Express backend (Node.js + MongoDB + Mongoose + pdf-parse + mammoth + OpenAI API)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd smart-interview
   ```

2. **Install dependencies for both client and server:**

   ```bash
   npm install
   ```

## Usage

1. **Set up environment variables:**

   - Create a `.env` file in the `/server` directory.
   - Add the following variables:

     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/smart-interview
     OPENAI_API_KEY=your_openai_api_key
     ```

2. **Run the development servers:**

   ```bash
   npm start
   ```

   This will start both the React client (on `http://localhost:3000`) and the Express server (on `http://localhost:5000`).

## Application Flow

### Interviewee

1.  Navigate to the "Interviewee" tab.
2.  Upload your resume (PDF or DOCX).
3.  If any contact information (name, email, phone) is not found, you will be prompted to enter it.
4.  The interview will start, and you will be presented with a series of questions.
5.  Each question has a timer based on its difficulty.
6.  Submit your answers before the timer runs out.
7.  At the end of the interview, you will see a summary of your performance.

### Interviewer

1.  Navigate to the "Interviewer" tab.
2.  You will see a dashboard with a list of all candidates who have completed the interview.
3.  You can search for candidates by name and sort the table by score.
4.  Click on a candidate to view their detailed profile, including their answers, scores, and feedback for each question.
