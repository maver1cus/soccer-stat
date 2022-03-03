import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../app-router/app-router';
import PagesLayout from '../pages-layout/pages-layout';
import SoccerService from '../../services/soccer-service';
import { SoccerServiceProvider } from '../soccer-service-context/soccer-service-context';

const soccerService = new SoccerService();

function App() {
  return (
    <SoccerServiceProvider value={soccerService}>
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <PagesLayout>
          <AppRouter />
        </PagesLayout>
      </BrowserRouter>
    </SoccerServiceProvider>
  );
}

export default App;
