import React from 'react';
import './leagues-list.css';
import LeagueCard from '../league-card/league-card';

const LeaguesList = ({ leagues }) => (
  <div className="item-list">
    {leagues.map(({
      id, name, emblemUrl, country,
    }) => (
      <LeagueCard
        key={id}
        id={id}
        name={name}
        emblemUrl={emblemUrl}
        country={country}
      />
    ))}
  </div>
);

export default LeaguesList;
