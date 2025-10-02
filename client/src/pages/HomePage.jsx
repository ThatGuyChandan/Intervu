import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResumeUploader from '../components/ResumeUploader';
import WelcomeBackModal from '../components/WelcomeBackModal';

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { interviewStarted } = useSelector((state) => state.interview);
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewStarted) {
      setModalVisible(true);
    }
  }, [interviewStarted]);

  const handleContinue = () => {
    setModalVisible(false);
    navigate('/interview');
  };

  const handleRestart = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <h1>Welcome to Smart Interview</h1>
      <ResumeUploader />
      <WelcomeBackModal
        visible={modalVisible}
        onContinue={handleContinue}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default HomePage;
