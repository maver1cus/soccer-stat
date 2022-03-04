import React from 'react';
import { Card } from 'antd';
import './leagues-list.css';

const LeaguesList = ({ leagues }) => {
  return (
    <div className="leagues-list">
      {leagues.map(({
        id, name, country, emblemUrl,
      }) => (
        <Card key={id} span={5} className="leagues-list__card">
          <div
            className="leagues-list__image"
            style={{ backgroundImage: `url(${emblemUrl})` }}
          />
          <h3>{name}</h3>
          <p>{country}</p>
        </Card>
      ))}
    </div>
  );
};

export default LeaguesList;
