import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageRoutes from '../../utils/page-routes';

const AppRouter = () => {
  return (
    <Routes>
      {
        PageRoutes.map(({ path, element }) => (
          <Route path={path} element={element} key={path} />
        ))
      }
    </Routes>
  );
};

export default AppRouter;
