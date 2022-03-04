import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import './leagues-list.css';

const LeaguesList = ({ leagues }) => (
  <div className="leagues-list">
    {leagues.map(({
      id, name, country, emblemUrl,
    }) => (
      <Link key={id} to={`leagues/${id}`}>
        <Card className="leagues-list__card">
          <div
            className="leagues-list__image"
            style={{ backgroundImage: `url(${emblemUrl})` }}
          />
          <h3>{name}</h3>
          <p>{country}</p>
        </Card>
      </Link>
    ))}
  </div>
);

export default LeaguesList;
