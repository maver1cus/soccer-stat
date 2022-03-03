import React from 'react';
import withSoccerService from '../../hoc/with-soccer-service';

const LeaguesPage = () => {
  return (
    <div className="container">
      LeaguesPage
    </div>
  );
};

const mapMethodsToProps = (soccerService) => ({
  getData: soccerService.getLeagues,
});

export default withSoccerService(mapMethodsToProps)(LeaguesPage);
