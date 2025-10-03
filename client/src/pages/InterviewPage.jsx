import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';
import SummaryModal from '../components/SummaryModal';
import { submitAnswer as submitAnswerAPI } from '../services/api';
import { nextQuestion, setAnswer, setInterviewResult, resetInterview } from '../features/interview/interviewSlice';

const InterviewPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false);
  const isSubmitting = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    candidateId,
    questions,
    currentQuestionIndex,
    finalScore,
    summary,
  } = useSelector((state) => state.interview);

  useEffect(() => {
    setCurrentAnswer('');
    setIsTimerRunning(true);
  }, [currentQuestionIndex]);

  const handleSubmit = async (answer) => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    setIsTimerRunning(false);

    setLoading(true);
    try {
      dispatch(setAnswer({ questionIndex: currentQuestionIndex, answer }));
      const data = await submitAnswerAPI(candidateId, currentQuestionIndex, answer);
      if (currentQuestionIndex < questions.length - 1) {
        dispatch(nextQuestion());
      } else {
        dispatch(setInterviewResult(data));
        dispatch(nextQuestion()); // Move to the end of the questions array
        setIsSummaryModalVisible(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        message.error('We have reached our request limit. Please try again after some time.');
      } else {
        message.error('Failed to submit answer. Please try again.');
      }
    }
    setLoading(false);
    isSubmitting.current = false;
  };

  const handleTimeout = () => {
    handleSubmit(currentAnswer);
  };

  const handleCloseSummaryModal = () => {
    setIsSummaryModalVisible(false);
    dispatch(resetInterview());
    navigate('/');
  };

  if (!candidateId) {
    return <div>Please start the interview from the home page.</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <SummaryModal
        open={isSummaryModalVisible}
        onCancel={handleCloseSummaryModal}
        finalScore={finalScore}
        summary={summary}
      />
    );
  }

  return (
    <div>
      <ProgressBar />
      <Timer
        key={currentQuestionIndex}
        onTimeout={handleTimeout}
        isRunning={isTimerRunning}
      />
      <ChatBox
        onFinish={handleSubmit}
        loading={loading}
        answer={currentAnswer}
        setAnswer={setCurrentAnswer}
      />
    </div>
  );
};

export default InterviewPage;
