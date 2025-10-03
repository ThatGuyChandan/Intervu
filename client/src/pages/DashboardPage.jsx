import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import CandidateTable from '../components/CandidateTable';
import CandidateDetail from '../components/CandidateDetail';

const { Title } = Typography;

const DashboardPage = () => {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setModalOpen(true);
  };

  const handleCancelModal = () => {
    setModalOpen(false);
    setSelectedCandidateId(null);
  };

  return (
    <Card>
      <Title level={2}>Interviewer Dashboard</Title>
      <CandidateTable onViewDetails={handleViewDetails} />
      {selectedCandidateId && (
        <CandidateDetail
          open={modalOpen}
          onCancel={handleCancelModal}
          candidateId={selectedCandidateId}
        />
      )}
    </Card>
  );
};

export default DashboardPage;