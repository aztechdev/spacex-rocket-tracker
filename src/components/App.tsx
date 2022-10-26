import React from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { Alert, AlertTitle, Box, Container, Typography } from '@mui/material';
import ROCKETS_QUERY, { RocketData } from '../queries/RocketsQuery';
import RocketLookup from './RocketLookup/RocketLookup';
import SpaceXDragon from '../assets/SpaceXDragon.png';

const renderRocketLookupUI = (
  loading: boolean,
  error: ApolloError | undefined,
  data: RocketData | undefined
) => {
  if (loading)
    return (
      <Alert severity="info" variant="outlined">
        <AlertTitle>Ready for liftoff!</AlertTitle>Loading rocket data...
      </Alert>
    );
  if (error)
    return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>Houston, we've had a problem</AlertTitle>There was an issue
        fetching rocket data!
      </Alert>
    );
  if (!data || !data.rockets || data.rockets.length === 0) {
    return (
      <Alert severity="warning">
        <AlertTitle>Lost in space</AlertTitle>No rocket data found.
      </Alert>
    );
  }
  return <RocketLookup rockets={data?.rockets} />;
};

function App() {
  const { loading, error, data } = useQuery<RocketData>(ROCKETS_QUERY);
  return (
    <Container maxWidth={'lg'}>
      <Typography
        variant="h1"
        align="center"
        gutterBottom={true}
        mt={1}
        fontWeight={'700'}
      >
        SpaceX Rocket Lookup
      </Typography>
      <Box
        p={2}
        sx={{
          transform: 'rotate(33deg)',
          textAlign: 'center',
          '@keyframes floating': {
            '0%': {
              transform: 'translateY(-1%)',
              transition: 'linear 1s',
            },
            '50%': {
              transform: 'translateY(1%)',
              transition: 'linear 1s',
            },
          },
          img: {
            transform: 'translateY(-1%)',
            animation: 'floating 3s infinite',
            transition: 'linear 1s',
          },
        }}
      >
        <img src={SpaceXDragon} alt={'SpaceX Dragon'} />
      </Box>
      {renderRocketLookupUI(loading, error, data)}
    </Container>
  );
}

export default App;
