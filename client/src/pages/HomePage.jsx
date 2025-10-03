import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Row, Col } from 'antd';
import ResumeUploader from '../components/ResumeUploader';
import WelcomeBackModal from '../components/WelcomeBackModal';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { interviewStarted } = useSelector((state) => state.interview);
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewStarted) {
      setModalOpen(true);
    }
  }, [interviewStarted]);

  const handleContinue = () => {
    setModalOpen(false);
    navigate('/interview');
  };

  const handleRestart = () => {
    setModalOpen(false);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100%' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Welcome to Smart Interview</Title>
            <Paragraph>
              Upload your resume to start a personalized interview experience.
            </Paragraph>
          </div>
          <ResumeUploader />
        </Card>
      </Col>
      <WelcomeBackModal
        open={modalOpen}
        onContinue={handleContinue}
        onRestart={handleRestart}
      />
    </Row>
  );
};

export default HomePage;