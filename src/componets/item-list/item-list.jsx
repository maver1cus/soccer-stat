import React from 'react';
import './item-list.css';

const TeamsList = ({ items, card }) => (
  <div className="item-list">
    {
      items.map((item) => card(item))
    }
  </div>
);

export default TeamsList;
