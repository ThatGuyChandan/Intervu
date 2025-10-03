import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Card, Button, Tooltip } from 'antd';
import { fetchCandidates } from '../features/candidates/candidatesSlice';
import './CandidateTable.css';

const { Search } = Input;

const CandidateTable = ({ onViewDetails }) => {
  const dispatch = useDispatch();
  const { list: candidates, loading } = useSelector((state) => state.candidates);
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCandidates(candidates);
  }, [candidates]);

  const handleSearch = (value) => {
    const filtered = candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCandidates(filtered);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Final Score',
      dataIndex: 'finalScore',
      key: 'finalScore',
      sorter: (a, b) => a.finalScore - b.finalScore,
      render: (score) => `${score}%`,
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary',
      render: (text) => (
        <Tooltip title={text}>
          <span>{text?.substring(0, 100)}...</span>
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => onViewDetails(record._id)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <Search
        placeholder="Search by name"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        className="candidate-table"
        dataSource={filteredCandidates}
        columns={columns}
        loading={loading}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => onViewDetails(record._id),
        })}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default CandidateTable;