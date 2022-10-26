import React from 'react';
import Rocket from '../../types/Rocket';
import { Box, Button, Chip, Divider } from '@mui/material';
import {
  FilterListRounded,
  FilterListOffRounded,
  SortRounded,
  RestartAltRounded,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
} from '@mui/icons-material';
import {
  filterRockets,
  RocketFilter,
  RocketFilterState,
  RocketSortState,
  SortAttribute,
  SortOrder,
  sortRockets,
} from './RocketLookup.helpers';
import RocketInfo from './RocketInfo';
import { isEmpty } from '../../utils';

interface RocketLookupProps {
  rockets: Rocket[];
}

const INITIAL_SORT_STATE = {
  order: SortOrder.ASCENDING,
  attribute: SortAttribute.ID,
};

function RocketLookup({ rockets }: RocketLookupProps) {
  const [filters, setFilters] = React.useState<RocketFilterState>({});
  const [sortOrder, setSortOrder] =
    React.useState<RocketSortState>(INITIAL_SORT_STATE);
  const filteredRockets = filterRockets(rockets, filters);
  const sortedRockets = sortRockets(filteredRockets, sortOrder);

  const toggleActiveRockets = () => {
    setFilters((previousFilters) => {
      if (filters.ACTIVE) {
        const updatedFilters = { ...previousFilters };
        delete updatedFilters[RocketFilter.ACTIVE];
        return updatedFilters;
      }
      return {
        ...previousFilters,
        [RocketFilter.ACTIVE]: true,
      };
    });
  };
  const toggleMerlinRockets = () => {
    setFilters((previousFilters) => {
      if (filters.MERLIN_ENGINES) {
        const updatedFilters = { ...previousFilters };
        delete updatedFilters[RocketFilter.MERLIN_ENGINES];
        return updatedFilters;
      }
      return {
        ...previousFilters,
        [RocketFilter.MERLIN_ENGINES]: true,
      };
    });
  };

  const sortByCostPerLaunch = () => {
    setSortOrder((previousSortOrder) => {
      const { order, attribute } = previousSortOrder;
      return {
        order:
          order === SortOrder.ASCENDING && attribute === SortAttribute.COST
            ? SortOrder.DESCENDING
            : SortOrder.ASCENDING,
        attribute: SortAttribute.COST,
      };
    });
  };

  const sortByNumberOfEngines = () => {
    setSortOrder((previousSortOrder) => {
      const { order, attribute } = previousSortOrder;
      return {
        order:
          order === SortOrder.ASCENDING &&
          attribute === SortAttribute.NUMBER_OF_ENGINES
            ? SortOrder.DESCENDING
            : SortOrder.ASCENDING,
        attribute: SortAttribute.NUMBER_OF_ENGINES,
      };
    });
  };

  const clearFilters = () => setFilters({});
  const resetSortOrder = () => setSortOrder(INITIAL_SORT_STATE);

  console.log({ filters });
  console.log({ sortOrder });

  return (
    <>
      <Box
        sx={{ mb: 3, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
      >
        <Box>
          <Chip
            icon={<FilterListRounded />}
            color="success"
            label={'Filter Active Rockets'}
            variant={filters.ACTIVE ? 'filled' : 'outlined'}
            onClick={toggleActiveRockets}
          />
          <Chip
            icon={<FilterListRounded />}
            color="success"
            label={'Filter Merlin Engines'}
            variant={filters.MERLIN_ENGINES ? 'filled' : 'outlined'}
            onClick={toggleMerlinRockets}
          />
          {!isEmpty(filters) ? (
            <Chip
              icon={<FilterListOffRounded />}
              label={'Clear All Filters'}
              onClick={clearFilters}
            />
          ) : null}
        </Box>
        <Box>
          <Button
            startIcon={<SortRounded />}
            endIcon={
              sortOrder.attribute === SortAttribute.COST &&
              (sortOrder.order === SortOrder.ASCENDING ? (
                <ArrowUpwardRounded />
              ) : (
                <ArrowDownwardRounded />
              ))
            }
            variant={
              sortOrder.attribute === SortAttribute.COST
                ? 'contained'
                : 'outlined'
            }
            onClick={sortByCostPerLaunch}
          >
            Cost Per Launch
          </Button>
          <Button
            startIcon={<SortRounded />}
            endIcon={
              sortOrder.attribute === SortAttribute.NUMBER_OF_ENGINES &&
              (sortOrder.order === SortOrder.ASCENDING ? (
                <ArrowUpwardRounded />
              ) : (
                <ArrowDownwardRounded />
              ))
            }
            variant={
              sortOrder.attribute === SortAttribute.NUMBER_OF_ENGINES
                ? 'contained'
                : 'outlined'
            }
            onClick={sortByNumberOfEngines}
          >
            # of Engines
          </Button>
          <Button startIcon={<RestartAltRounded />} onClick={resetSortOrder}>
            Reset Sort Order
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        {sortedRockets?.map((rocket) => (
          <RocketInfo key={rocket.id} {...rocket} />
        ))}
      </Box>
    </>
  );
}

export default RocketLookup;
