import React from 'react';
import './teams-list.css';
import TeamCard from '../team-card/team-card';

const TeamsList = ({ teams }) => (
  <div className="item-list">
    {teams.map(({
      id, name, image,
    }) => (
      <TeamCard
        key={id}
        id={id}
        name={name}
        image={image}
      />
    ))}
  </div>
);

export default TeamsList;
