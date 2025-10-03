import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Descriptions, Card, List, Spin, Alert, Tag, Row, Col } from 'antd';
import { fetchCandidateById } from '../features/candidates/candidatesSlice';
import './CandidateDetail.css';

const CandidateDetail = ({ open, onCancel, candidateId }) => {
  const dispatch = useDispatch();
  const { selectedCandidate, loading, error } = useSelector(
    (state) => state.candidates
  );

  useEffect(() => {
    if (candidateId) {
      dispatch(fetchCandidateById(candidateId));
    }
  }, [dispatch, candidateId]);

  const getScoreColor = (score) => {
    if (score >= 8) return 'green';
    if (score >= 5) return 'orange';
    return 'red';
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      width="80vw"
      footer={null}
      title="Candidate Details"
    >
      {loading && <Spin size="large" />}
      {error && <Alert message="Error" description={error} type="error" />}
      {selectedCandidate && !loading && (
        <div className="candidate-detail-container">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Descriptions title="Candidate Information" bordered column={{ xs: 1, sm: 2 }}>
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
                    <Tag color={getScoreColor(selectedCandidate.finalScore)}>
                      {selectedCandidate.finalScore?.toFixed(2)}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Summary">
                <p>{selectedCandidate.summary}</p>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Questions & Answers">
                <div className="qa-list-container">
                  <List
                    dataSource={selectedCandidate.questions}
                    renderItem={(item) => (
                      <List.Item>
                        <div className="qa-item">
                          <p className="question">{item.question}</p>
                          <p className="answer">{item.answer}</p>
                          <div className="feedback">
                            <Tag color={getScoreColor(item.score)}>
                              Score: {item.score}
                            </Tag>
                            <p>{item.feedback}</p>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Modal>
  );
};

export default CandidateDetail;