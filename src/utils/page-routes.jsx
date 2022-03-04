import React from 'react';
import LeaguesPage from '../pages/leagues-page/leagues-page';
import TeamsPage from '../pages/teams-page/teams-page';
import TeamCalendarPage from '../pages/team-calendar-page/team-calendar-page';
import LeagueCalendarPage from '../pages/league-calendar-page/league-calendar-page';

const PageRoutes = [
  { path: '/', element: <LeaguesPage />, menu: 'Лиги' },
  { path: '/teams', element: <TeamsPage />, menu: 'Команды' },
  { path: 'teams/:id', element: <TeamCalendarPage />, menu: '' },
  { path: 'leagues/:id', element: <LeagueCalendarPage />, menu: '' },
];

export default PageRoutes;
