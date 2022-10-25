import React from 'react';
import { useQuery } from '@apollo/client';
import ROCKETS, { RocketData, Rocket } from './RocketsQuery';
import { Alert, Box, Button } from '@mui/material';
import RocketInfo from './RocketInfo';

function RocketLookup() {
  const { loading, error, data } = useQuery<RocketData>(ROCKETS);
  const [showInactiveRockets, setShowInactiveRockets] = React.useState(true);

  const toggleFilterRockets = () =>
    setShowInactiveRockets(!showInactiveRockets);
  const filterInactiveRockets = (rocket: Rocket) =>
    showInactiveRockets || rocket.active;

  if (loading) return <Alert severity="info">Loading rocket data...</Alert>;
  if (error)
    return (
      <Alert severity="error">There was an issue fetching rocket data!</Alert>
    );

  return (
    <>
      <Button
        variant={showInactiveRockets ? 'outlined' : 'contained'}
        onClick={toggleFilterRockets}
      >
        {showInactiveRockets ? 'Show Inactive Rockets' : 'Show All Rockets'}
      </Button>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        {data ? (
          data.rockets
            ?.filter(filterInactiveRockets)
            ?.map((rocket) => <RocketInfo {...rocket} />)
        ) : (
          <Alert severity="info">No rockets match your search criteria</Alert>
        )}
      </Box>
    </>
  );
}

export default RocketLookup;
