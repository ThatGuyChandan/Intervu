import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Descriptions, Card, List, Spin, Alert } from 'antd';
import { fetchCandidateById } from '../features/candidates/candidatesSlice';

const CandidateDetail = ({ visible, onCancel, candidateId }) => {
  const dispatch = useDispatch();
  const { selectedCandidate, loading, error } = useSelector(
    (state) => state.candidates
  );

  useEffect(() => {
    if (candidateId) {
      dispatch(fetchCandidateById(candidateId));
    }
  }, [dispatch, candidateId]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={800}
      footer={null}
      title="Candidate Details"
    >
      {loading && <Spin size="large" />}
      {error && <Alert message="Error" description={error} type="error" />}
      {selectedCandidate && !loading && (
        <div>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {selectedCandidate.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedCandidate.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedCandidate.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Final Score">
              {selectedCandidate.finalScore?.toFixed(2)}
            </Descriptions.Item>
          </Descriptions>
          <Card title="Summary" style={{ marginTop: 16 }}>
            <p>{selectedCandidate.summary}</p>
          </Card>
          <List
            header={<div>Questions & Answers</div>}
            bordered
            dataSource={selectedCandidate.questions}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.question}
                  description={`Answer: ${item.answer}`}
                />
                <div>
                  <p>Score: {item.score}</p>
                  <p>Feedback: {item.feedback}</p>
                </div>
              </List.Item>
            )}
            style={{ marginTop: 16 }}
          />
        </div>
      )}
    </Modal>
  );
};

export default CandidateDetail;
