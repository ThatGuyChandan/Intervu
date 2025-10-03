import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Form, Card } from 'antd';

const ChatBox = ({ onFinish, loading, answer, setAnswer }) => {
  const {
    questions,
    currentQuestionIndex,
  } = useSelector((state) => state.interview);

  const handleFormFinish = () => {
    onFinish(answer);
  };

  return (
    <Card title={`Question ${currentQuestionIndex + 1} of ${questions.length}`}>
      <p>{questions[currentQuestionIndex]?.question}</p>
      <Form onFinish={handleFormFinish}>
        <Form.Item>
          <Input.TextArea
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
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