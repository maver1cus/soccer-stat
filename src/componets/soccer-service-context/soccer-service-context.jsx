import { createContext } from 'react';

const { Provider: SoccerServiceProvider, Consumer: SoccerServiceConsumer } =
  createContext(null);

export { SoccerServiceProvider, SoccerServiceConsumer };
