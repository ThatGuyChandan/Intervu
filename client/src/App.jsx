import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import DashboardPage from './pages/DashboardPage';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Interviewee</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/dashboard">Interviewer</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/interview" element={<InterviewPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
