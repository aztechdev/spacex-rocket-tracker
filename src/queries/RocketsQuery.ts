import { gql } from '@apollo/client';
import Rocket from '../types/Rocket';

export interface RocketData {
  rockets: Rocket[];
}

const ROCKETS_QUERY = gql`
  query Rockets {
    rockets {
      id
      name
      active
      description
      first_flight
      cost_per_launch
      engines {
        type
        number
      }
      wikipedia
    }
  }
`;

export default ROCKETS_QUERY;
