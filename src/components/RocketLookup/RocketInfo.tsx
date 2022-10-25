import React from 'react';
import { Rocket } from './RocketsQuery';
import { Box, Typography } from '@mui/material';

function RocketInfo({
  id,
  name,
  active,
  description,
  first_flight,
  cost_per_launch,
  engines,
  height,
  mass,
  wikipedia,
}: Rocket) {
  return (
    <Box
      key={id}
      sx={{
        bgcolor: '#f5f5f5',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
      }}
    >
      <Typography variant="h3">{name}</Typography>
      <Typography variant="h5">
        Engine Type: {engines?.type ? engines.type.toUpperCase() : 'N/A'}
      </Typography>
      <Typography variant="h6" gutterBottom={true}>
        First flight: {first_flight}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
}

export default RocketInfo;
