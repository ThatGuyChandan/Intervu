import React from 'react';
import { Modal, Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const SummaryModal = ({ open, onCancel, finalScore, summary }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title="Interview Complete"
    >
      <Card>
        <Title level={4}>Final Score: {finalScore?.toFixed(2)}</Title>
        <Title level={4}>Summary:</Title>
        <Paragraph>{summary}</Paragraph>
      </Card>
    </Modal>
  );
};

export default SummaryModal;
