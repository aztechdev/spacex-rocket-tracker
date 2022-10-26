interface RocketEngine {
  type: string;
  number: number;
}

interface Rocket {
  [key: string]: string | boolean | number | RocketEngine;
  id: string;
  name: string;
  active: boolean;
  description: string;
  first_flight: string;
  cost_per_launch: number;
  engines: RocketEngine;
  wikipedia: string;
}

export default Rocket;
