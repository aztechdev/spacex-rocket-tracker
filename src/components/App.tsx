import React from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { Alert, Container } from '@mui/material';
import RocketLookup from './RocketLookup/RocketLookup';
import { Typography } from '@mui/material';
import ROCKETS_QUERY, { RocketData } from '../queries/RocketsQuery';

const renderRocketLookupUI = (
  loading: boolean,
  error: ApolloError | undefined,
  data: RocketData | undefined
) => {
  if (loading) return <Alert severity="info">Loading rocket data...</Alert>;
  if (error)
    return (
      <Alert severity="error">There was an issue fetching rocket data!</Alert>
    );
  if (!data || !data.rockets || data.rockets.length === 0) {
    return <Alert severity="warning">No rocket data found.</Alert>;
  }
  return <RocketLookup rockets={data?.rockets} />;
};

function App() {
  const { loading, error, data } = useQuery<RocketData>(ROCKETS_QUERY);
  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom={true}>
        SpaceX Rocket Lookup
      </Typography>
      {renderRocketLookupUI(loading, error, data)}
    </Container>
  );
}

export default App;
