import { gql } from '@apollo/client';

interface RocketEngine {
  type: string;
  number: number;
}

interface RocketHeight {
  meters: number;
}

interface RocketMass {
  kg: number;
}

export interface Rocket {
  id: string;
  name: string;
  active: boolean;
  description: string;
  first_flight: string;
  cost_per_launch: number;
  engines: RocketEngine;
  height: RocketHeight;
  mass: RocketMass;
  wikipedia: string;
}

export interface RocketData {
  rockets: Rocket[];
}

const ROCKETS = gql`
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
      height {
        meters
      }
      mass {
        kg
      }
      wikipedia
    }
  }
`;

export default ROCKETS;
