import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import DashboardPage from './pages/DashboardPage';
import './index.css';

const { Header, Content } = Layout;

const AppLayout = () => {
  const location = useLocation();

  const getSelectedKeys = () => {
    if (location.pathname.startsWith('/dashboard')) {
      return ['2'];
    }
    return ['1'];
  };

  return (
    <Layout className="app-layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={getSelectedKeys()}
          items={[
            { key: '1', label: <Link to="/">Interviewee</Link> },
            { key: '2', label: <Link to="/dashboard">Interviewer</Link> },
          ]}
        />
      </Header>
      <Content>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
