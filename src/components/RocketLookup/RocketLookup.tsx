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
  const filteredRockets = React.useMemo(
    () => filterRockets(rockets, filters),
    [rockets, filters]
  );
  const sortedRockets = React.useMemo(
    () => sortRockets(filteredRockets, sortOrder),
    [filteredRockets, sortOrder]
  );

  const updateFilterState = (rocketFilter: RocketFilter) => {
    setFilters((previousFilters) => {
      if (filters[rocketFilter]) {
        const updatedFilters = { ...previousFilters };
        delete updatedFilters[rocketFilter];
        return updatedFilters;
      }
      return {
        ...previousFilters,
        [rocketFilter]: true,
      };
    });
  };

  const updateSortState = (sortAttribute: SortAttribute) => {
    setSortOrder((previousSortOrder) => {
      const { order, attribute } = previousSortOrder;
      return {
        order:
          order === SortOrder.ASCENDING && attribute === sortAttribute
            ? SortOrder.DESCENDING
            : SortOrder.ASCENDING,
        attribute: sortAttribute,
      };
    });
  };

  const clearFilters = () => setFilters({});
  const resetSortOrder = () => setSortOrder(INITIAL_SORT_STATE);

  return (
    <>
      <Box
        sx={{
          mb: 3,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        <Box>
          <Chip
            icon={<FilterListRounded />}
            color="success"
            label={'Filter Active Rockets'}
            variant={filters.ACTIVE ? 'filled' : 'outlined'}
            onClick={() => updateFilterState(RocketFilter.ACTIVE)}
            sx={{
              mx: 1,
            }}
          />
          <Chip
            icon={<FilterListRounded />}
            color="success"
            label={'Filter Merlin Engines'}
            variant={filters.MERLIN_ENGINES ? 'filled' : 'outlined'}
            onClick={() => updateFilterState(RocketFilter.MERLIN_ENGINES)}
            sx={{
              mx: 1,
            }}
          />
          {!isEmpty(filters) ? (
            <Chip
              icon={<FilterListOffRounded />}
              label={'Clear All Filters'}
              onClick={clearFilters}
              sx={{
                mx: 1,
              }}
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
            onClick={() => updateSortState(SortAttribute.COST)}
            sx={{
              mx: 1,
            }}
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
            onClick={() => updateSortState(SortAttribute.NUMBER_OF_ENGINES)}
            sx={{
              mx: 1,
            }}
          >
            # of Engines
          </Button>
          {sortOrder.attribute !== INITIAL_SORT_STATE.attribute ? (
            <Button startIcon={<RestartAltRounded />} onClick={resetSortOrder}>
              Reset Sort Order
            </Button>
          ) : null}
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
        data-testid="rocket-info-grid"
      >
        {sortedRockets?.map((rocket) => (
          <RocketInfo key={rocket.id} rocket={rocket} />
        ))}
      </Box>
    </>
  );
}

export default RocketLookup;
