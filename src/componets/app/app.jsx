import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../app-router/app-router';
import PagesLayout from '../pages-layout/pages-layout';

function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <PagesLayout>
        <AppRouter />
      </PagesLayout>
    </BrowserRouter>
  );
}

export default App;
