import React from 'react';
import { Link } from 'react-router-dom';

const PagesLayout = ({ children }) => {
  return (
    <Layout>
      <Layout.Header>
        <nav>
          <ul>
            <li>
              <Link to="/">Лиги</Link>
            </li>
            <li>
              <Link to="/teams">Команды</Link>
            </li>
            <li>
              <Link to="/teams/2">Команда 2</Link>
            </li>
            <li>
              <Link to="/leagues/2">Лига 2</Link>
            </li>
          </ul>
        </nav>
      </Layout.Header>
      <Layout.Content>
        { children }
      </Layout.Content>
    </Layout>
  );
};

export default PagesLayout;
