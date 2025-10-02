import React from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { resetInterview } from '../features/interview/interviewSlice';

const WelcomeBackModal = ({ visible, onContinue, onRestart }) => {
  const dispatch = useDispatch();

  const handleRestart = () => {
    dispatch(resetInterview());
    onRestart();
  };

  return (
    <Modal
      title="Welcome Back!"
      visible={visible}
      footer={[
        <Button key="restart" onClick={handleRestart}>
          Restart Interview
        </Button>,
        <Button key="continue" type="primary" onClick={onContinue}>
          Continue Interview
        </Button>,
      ]}
    >
      <p>You have an unfinished interview session. Would you like to continue?</p>
    </Modal>
  );
};

export default WelcomeBackModal;
