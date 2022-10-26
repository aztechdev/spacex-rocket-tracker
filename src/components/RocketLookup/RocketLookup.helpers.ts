import Rocket from '../../types/Rocket';
import { isEmpty } from '../../utils';

export enum RocketFilter {
  ACTIVE = 'ACTIVE',
  MERLIN_ENGINES = 'MERLIN_ENGINES',
}
export type RocketFilterState = {
  [key in RocketFilter]?: boolean;
};

export function filterRockets(rockets: Rocket[], filters: RocketFilterState) {
  if (isEmpty(filters)) {
    return rockets;
  }
  return rockets.filter((rocket) => {
    return Object.keys(filters).every((filter) => {
      if (filter === RocketFilter.ACTIVE) {
        return rocket.active;
      }
      if (filter === RocketFilter.MERLIN_ENGINES) {
        return rocket.engines.type === 'merlin';
      }
      return false;
    });
  });
}

export enum SortOrder {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

export enum SortAttribute {
  ID,
  COST,
  NUMBER_OF_ENGINES,
}

export interface RocketSortState {
  order: SortOrder;
  attribute: SortAttribute;
}

export function sortRockets(rockets: Rocket[], sortOrder: RocketSortState) {
  return [...rockets].sort((rocket1, rocket2) => {
    if (sortOrder.order === SortOrder.ASCENDING) {
      switch (sortOrder.attribute) {
        case SortAttribute.COST:
          return rocket1.cost_per_launch - rocket2.cost_per_launch;
        case SortAttribute.NUMBER_OF_ENGINES:
          return rocket1.engines.number - rocket2.engines.number;
        default:
          return rocket1.id.localeCompare(rocket2.id, 'en');
      }
    } else {
      switch (sortOrder.attribute) {
        case SortAttribute.COST:
          return rocket2.cost_per_launch - rocket1.cost_per_launch;
        case SortAttribute.NUMBER_OF_ENGINES:
          return rocket2.engines.number - rocket1.engines.number;
        default:
          return rocket2.id.localeCompare(rocket1.id, 'en');
      }
    }
  });
}
