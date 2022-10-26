import React from 'react';
import Rocket from '../../types/Rocket';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Link,
  Typography,
} from '@mui/material';
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
    <Card
      sx={{
        bgcolor: '#eceff1',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
      }}
      data-testid="rocket-info"
    >
      <CardHeader
        avatar={
          <span role="img" aria-label="rocket">
            🚀
          </span>
        }
        title={
          <Typography variant="h4" fontWeight={'700'}>
            {name}
          </Typography>
        }
        action={
          <Chip
            label={active ? 'Active' : 'Inactive'}
            color={active ? 'success' : 'info'}
            sx={{
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          />
        }
      />
      <CardContent>
        <Typography variant="h5" fontWeight={'500'}>
          First flight: {first_flight}
        </Typography>
        <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
          {engines.number} {engines.type} Engines
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true} fontWeight={'500'}>
          Cost Per Launch: {formatNumberToUSD(cost_per_launch)}
        </Typography>
        <Typography variant="body1" fontWeight={'300'}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          href={wikipedia}
          target="_blank"
          rel="noopener noreferrer"
          fontWeight={'300'}
        >
          Learn more <OpenInNewRoundedIcon fontSize="inherit" />
        </Link>
      </CardActions>
    </Card>
  );
}

export default RocketInfo;
