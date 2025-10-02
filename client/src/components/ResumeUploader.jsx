import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Upload, message, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadResume, startInterview as startInterviewAPI } from '../services/api';
import { startInterview } from '../features/interview/interviewSlice';
import { useNavigate } from 'react-router-dom';

const ResumeUploader = () => {
  const [form] = Form.useForm();
  const [missingFields, setMissingFields] = useState([]);
  const [candidateId, setCandidateId] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('resume', values.resume[0].originFileObj);
    setLoading(true);

    try {
      const data = await uploadResume(formData);
      if (data.missingFields.length > 0) {
        setMissingFields(data.missingFields);
        setCandidateId(data.candidateId);
      } else {
        const { questions } = await startInterviewAPI(data.candidateId);
        dispatch(startInterview({ candidateId: data.candidateId, questions }));
        navigate('/interview');
      }
    } catch (error) {
      message.error('Failed to upload resume. Please try again.');
    }
    setLoading(false);
  };

  const handleMissingInfoSubmit = async (values) => {
    // This would typically be a call to an update endpoint
    // For now, we'll just start the interview
    try {
      const { questions } = await startInterviewAPI(candidateId);
      dispatch(startInterview({ candidateId, questions }));
      navigate('/interview');
    } catch (error) {
      message.error('Failed to start interview. Please try again.');
    }
  };

  return (
    <Card title="Start Your Interview">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="resume"
          label="Upload Your Resume (PDF or DOCX)"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[{ required: true, message: 'Please upload your resume' }]}
        >
          <Upload name="resume" beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Start Interview
          </Button>
        </Form.Item>
      </Form>
      {missingFields.length > 0 && (
        <Card title="Please provide the missing information">
          <Form onFinish={handleMissingInfoSubmit} layout="vertical">
            {missingFields.map((field) => (
              <Form.Item
                key={field}
                name={field}
                label={`Your ${field}`}
                rules={[{ required: true, message: `Please enter your ${field}` }]}
              >
                <Input />
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Proceed to Interview
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </Card>
  );
};

export default ResumeUploader;
