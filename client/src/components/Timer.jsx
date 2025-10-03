import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimer } from '../features/interview/interviewSlice';

const difficultyToTime = {
  Easy: 20,
  Medium: 60,
  Hard: 120,
};

const Timer = ({ onTimeout, isRunning }) => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex } = useSelector(
    (state) => state.interview
  );
  const difficulty = questions[currentQuestionIndex]?.difficulty;
  const initialTime = difficultyToTime[difficulty] || 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [currentQuestionIndex, initialTime]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      onTimeout();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      dispatch(setTimer(timeLeft - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, dispatch, isRunning]);

  return <div>Time Left: {timeLeft}s</div>;
};

export default Timer;