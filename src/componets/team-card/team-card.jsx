import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import noImage from './no-image.png';
import './team-card.css';

const TeamCard = ({
  id, name, image,
}) => {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="team-card">
        <div className="team-card__image">
          <img src={image || noImage} alt="" />
        </div>
        <h3 className="team-card__title">{name}</h3>
      </Card>
    </Link>
  );
};

export default TeamCard;
