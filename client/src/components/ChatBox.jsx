import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Form, Card, message } from 'antd';
import { submitAnswer } from '../services/api';
import { nextQuestion, setAnswer, resetInterview } from '../features/interview/interviewSlice';
import { useNavigate } from 'react-router-dom';

const ChatBox = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    candidateId,
    questions,
    currentQuestionIndex,
    finalScore,
    summary,
  } = useSelector((state) => state.interview);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      dispatch(setAnswer({ questionIndex: currentQuestionIndex, answer: values.answer }));
      await submitAnswer(candidateId, currentQuestionIndex, values.answer);
      form.resetFields();
      if (currentQuestionIndex < questions.length - 1) {
        dispatch(nextQuestion());
      } else {
        // Interview finished, the summary and final score are now in the state
        // (assuming the backend returns them in the final submitAnswer call)
      }
    } catch (error) {
      message.error('Failed to submit answer. Please try again.');
    }
    setLoading(false);
  };

  const handleNewInterview = () => {
    dispatch(resetInterview());
    navigate('/');
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <Card title="Interview Complete">
        <h2>Final Score: {finalScore}</h2>
        <h3>Summary:</h3>
        <p>{summary}</p>
        <Button type="primary" onClick={handleNewInterview}>
          Start New Interview
        </Button>
      </Card>
    );
  }

  return (
    <Card title={`Question ${currentQuestionIndex + 1} of ${questions.length}`}>
      <p>{questions[currentQuestionIndex]?.question}</p>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="answer"
          rules={[{ required: true, message: 'Please provide an answer' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit Answer
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChatBox;
