import React, { useState } from 'react';
import CandidateTable from '../components/CandidateTable';
import CandidateDetail from '../components/CandidateDetail';

const DashboardPage = () => {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setModalVisible(true);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    setSelectedCandidateId(null);
  };

  return (
    <div>
      <h1>Interviewer Dashboard</h1>
      <CandidateTable onSelectCandidate={handleSelectCandidate} />
      {selectedCandidateId && (
        <CandidateDetail
          visible={modalVisible}
          onCancel={handleCancelModal}
          candidateId={selectedCandidateId}
        />
      )}
    </div>
  );
};

export default DashboardPage;
