import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRouter from '../app-router/app-router';

function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <header>
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
      </header>
      <main>
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
