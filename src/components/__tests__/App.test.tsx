import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from '../App';
import ROCKETS_QUERY from '../../queries/RocketsQuery';
import MockRockets from '../../mocks/Rockets.mock';

const mocks = [
  {
    request: {
      query: ROCKETS_QUERY,
    },
    result: {
      data: {
        rockets: MockRockets,
      },
    },
  },
];

test('makes GraphQL query for SpaceX rocket data', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'SpaceX Rocket Lookup'
  );
  expect(await screen.findByText('Loading rocket data...')).toBeInTheDocument();
  expect(await screen.findByTestId('rocket-info-grid')).toBeInTheDocument();
  const rocketInfoGrid = screen.getByTestId('rocket-info-grid');
  const rockets = within(rocketInfoGrid).getAllByTestId('rocket-info');
  expect(rockets.length).toBe(4);
});

test('displays warning UI if request is empty', async () => {
  const emptyMock = {
    request: {
      query: ROCKETS_QUERY,
    },
    result: {
      data: {
        rockets: [],
      },
    },
  };
  render(
    <MockedProvider mocks={[emptyMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(await screen.findByText('No rocket data found.')).toBeInTheDocument();
});

test('displays error UI if request fails', async () => {
  const errorMock = {
    request: {
      query: ROCKETS_QUERY,
    },
    error: new Error('An error occurred'),
  };
  render(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  expect(
    await screen.findByText('There was an issue fetching rocket data!')
  ).toBeInTheDocument();
});
