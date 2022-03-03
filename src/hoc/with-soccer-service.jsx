import React from 'react';
import { SoccerServiceConsumer } from '../componets/soccer-service-context/soccer-service-context';

const withSoccerService = (mapMethodsToProps) => (Wrapped) => (props) => {
  return (
    <SoccerServiceConsumer>
      {(soccerService) => {
        const serviceProps = mapMethodsToProps(soccerService);

        return <Wrapped {...props} {...serviceProps} />;
      }}
    </SoccerServiceConsumer>
  );
};

export default withSoccerService;
