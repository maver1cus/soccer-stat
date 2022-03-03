import React from 'react';
import { Layout } from 'antd';
import MainMenu from '../main-menu/main-menu';
import Logo from '../logo/logo';
import './pages-layout.css';

const PagesLayout = ({ children }) => {
  return (
    <Layout>
      <Layout.Header className="page-header">
        <div className="container">
          <Logo />
          <MainMenu />
        </div>
      </Layout.Header>
      <Layout.Content>
        {children}
      </Layout.Content>
    </Layout>
  );
};

export default PagesLayout;
