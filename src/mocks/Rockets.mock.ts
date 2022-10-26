import Rocket from '../types/Rocket';

export const MockFalcon1: Rocket = {
  id: 'falcon1',
  name: 'Falcon 1',
  active: false,
  description:
    'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.',
  first_flight: '2006-03-24',
  cost_per_launch: 6700000,
  engines: {
    type: 'merlin',
    number: 1,
  },
  wikipedia: 'https://en.wikipedia.org/wiki/Falcon_1',
};

export const MockFalcon9: Rocket = {
  id: 'falcon9',
  name: 'Falcon 9',
  active: true,
  description:
    'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.',
  first_flight: '2010-06-04',
  cost_per_launch: 50000000,
  engines: {
    type: 'merlin',
    number: 9,
  },
  wikipedia: 'https://en.wikipedia.org/wiki/Falcon_9',
};

export const MockFalconHeavy: Rocket = {
  id: 'falconheavy',
  name: 'Falcon Heavy',
  active: true,
  description:
    'With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.',
  first_flight: '2018-02-06',
  cost_per_launch: 90000000,
  engines: {
    type: 'merlin',
    number: 27,
  },
  wikipedia: 'https://en.wikipedia.org/wiki/Falcon_Heavy',
};

export const MockStarship: Rocket = {
  id: 'starship',
  name: 'Starship',
  active: false,
  description:
    'Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.',
  first_flight: '2021-12-01',
  cost_per_launch: 7000000,
  engines: {
    type: 'raptor',
    number: 37,
  },
  wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_Starship',
};

const MockRockets = [MockFalcon1, MockFalcon9, MockFalconHeavy, MockStarship];

export default MockRockets;
