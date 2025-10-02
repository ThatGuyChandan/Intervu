import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  candidateId: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  timer: 0,
  interviewStarted: false,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    startInterview: (state, action) => {
      state.candidateId = action.payload.candidateId;
      state.questions = action.payload.questions;
      state.interviewStarted = true;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
    },
    setAnswer: (state, action) => {
      state.answers[action.payload.questionIndex] = action.payload.answer;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    resetInterview: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  startInterview,
  nextQuestion,
  setAnswer,
  setTimer,
  resetInterview,
} = interviewSlice.actions;

export default interviewSlice.reducer;
