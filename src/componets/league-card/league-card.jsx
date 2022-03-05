import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import './league-card.css';

const LeagueCard = ({
  id, name, emblemUrl, country,
}) => {
  return (
    <Link to={`/leagues/${id}`}>
      <Card className="league-card">
        <div className="league-card__image">
          <img src={emblemUrl} alt="" />
        </div>
        <h3>{name}</h3>
        <p>{country}</p>
      </Card>
    </Link>
  );
};

export default LeagueCard;
