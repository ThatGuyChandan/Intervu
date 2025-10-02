import React from 'react';
import { useSelector } from 'react-redux';
import ChatBox from '../components/ChatBox';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';

const InterviewPage = () => {
  const { interviewStarted } = useSelector((state) => state.interview);

  const handleTimeout = () => {
    // This should trigger the form submission in ChatBox
    // A more robust implementation would use a shared state or a ref
    document.querySelector('form button[type="submit"]').click();
  };

  if (!interviewStarted) {
    return <div>Please start the interview from the home page.</div>;
  }

  return (
    <div>
      <ProgressBar />
      <Timer onTimeout={handleTimeout} />
      <ChatBox />
    </div>
  );
};

export default InterviewPage;
