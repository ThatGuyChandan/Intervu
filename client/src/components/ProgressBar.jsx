import React from 'react';
import { useSelector } from 'react-redux';
import { Progress } from 'antd';

const ProgressBar = () => {
  const { questions, currentQuestionIndex } = useSelector(
    (state) => state.interview
  );
  const percent = ((currentQuestionIndex + 1) / questions.length) * 100;

  return <Progress percent={percent} />;
};

export default ProgressBar;
