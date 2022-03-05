import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import './team-card.css';

const TeamCard = ({
  id, name, image,
}) => {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="team-card">
        <div className="team-card__image">
          <img src={image} alt="" />
        </div>
        <h3>{name}</h3>
      </Card>
    </Link>
  );
};

export default TeamCard;
