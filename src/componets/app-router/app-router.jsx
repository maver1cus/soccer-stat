import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LeaguesPage from '../../pages/leagues-page/leagues-page';
import LeagueCalendarPage from '../../pages/league-calendar-page/league-calendar-page';
import TeamCalendarPage from '../../pages/team-calendar-page/team-calendar-page';
import TeamsPage from '../../pages/teams-page/teams-page';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LeaguesPage />} />
      <Route path="teams" element={<TeamsPage />} />
      <Route path="teams/:id" element={<TeamCalendarPage />} />
      <Route path="leagues/:id" element={<LeagueCalendarPage />} />
    </Routes>
  );
};

export default AppRouter;
