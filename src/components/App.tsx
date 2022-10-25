import React from 'react';
import Container from '@mui/material/Container';
import RocketLookup from './RocketLookup/RocketLookup';
import { Typography } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom={true}>
        SpaceX Rocket Lookup
      </Typography>
      <RocketLookup />
    </Container>
  );
}

export default App;
