import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../../const/index';

const AppRouter = () => {
  return (
    <Routes>
      {
        routes.map(({ path, element }) => (
          <Route path={path} element={element} key={path} />
        ))
      }

    </Routes>
  );
};

export default AppRouter;
