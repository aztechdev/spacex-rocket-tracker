import React from 'react';
import Rocket from '../../types/Rocket';
import { Box, Chip, Link, Typography } from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { formatNumberToUSD } from '../../utils';

interface RocketInfoProps {
  rocket: Rocket;
}

function RocketInfo({ rocket }: RocketInfoProps) {
  const {
    name,
    active,
    description,
    first_flight,
    cost_per_launch,
    engines,
    wikipedia,
  } = rocket;
  return (
    <Box
      sx={{
        bgcolor: '#f5f5f5',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        position: 'relative',
      }}
      data-testid="rocket-info"
    >
      <Chip
        label={active ? 'Active' : 'Inactive'}
        color={active ? 'success' : 'info'}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      />
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h5">First flight: {first_flight}</Typography>
      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
        {engines.number} {engines.type} Engines
      </Typography>
      <Typography variant="subtitle1" gutterBottom={true}>
        Cost Per Launch: {formatNumberToUSD(cost_per_launch)}
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        {description}
      </Typography>
      <Link href={wikipedia} target="_blank" rel="noopener noreferrer">
        More info <OpenInNewRoundedIcon fontSize="inherit" />
      </Link>
    </Box>
  );
}

export default RocketInfo;
