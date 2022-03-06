import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import noImage from './no-image.png';
import './league-card.css';

const LeagueCard = ({
  id, name, emblemUrl, country,
}) => {
  return (
    <Link to={`/leagues/${id}`}>
      <Card className="league-card">
        <div className="league-card__image">
          <img src={emblemUrl || noImage} alt="" />
        </div>
        <h3 className="league-card__title">{name}</h3>
        <p className="league-card__caption">{country}</p>
      </Card>
    </Link>
  );
};

export default LeagueCard;
