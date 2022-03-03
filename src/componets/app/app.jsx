import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRouter from '../app-router/app-router';

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Лиги</Link>
            </li>
            <li>
              <Link to="/teams">Команды</Link>
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
