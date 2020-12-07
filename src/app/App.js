import React from 'react';
import { Layout } from 'antd';
import Sidebar from './components/sidebar/Sidebar';
import AppHeader from './components/header/AppHeader';
import ContentRoutes from './ContentRoutes';
import './App.css';

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className="gx-app-layout">
      <Sidebar />
      <Layout>
        <AppHeader />
        <Content className="gx-layout-content">
          <div className="gx-main-content-wrapper">
            <ContentRoutes />
          </div>
          <Footer>
            <div className="gx-layout-footer-content"> © 2020</div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
