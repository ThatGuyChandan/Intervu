import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Card } from 'antd';
import { fetchCandidates } from '../features/candidates/candidatesSlice';

const { Search } = Input;

const CandidateTable = ({ onSelectCandidate }) => {
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
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary',
      ellipsis: true,
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
        dataSource={filteredCandidates}
        columns={columns}
        loading={loading}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => onSelectCandidate(record._id),
        })}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default CandidateTable;
