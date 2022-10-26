import React from 'react';
import { render, screen } from '@testing-library/react';
import RocketInfo from '../RocketInfo';
import { MockFalcon1 } from '../../../mocks/Rockets.mock';

test('renders Rocket information in a box', () => {
  render(<RocketInfo rocket={MockFalcon1} />);
  expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
    'Falcon 1'
  );
  expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
    'First flight: 2006-03-24'
  );
  expect(screen.getByText(/1 merlin engines/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Cost Per Launch: \$6,700,000.00/i, { selector: 'h6' })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/^the falcon 1/i, { selector: 'p' })
  ).toBeInTheDocument();
  const learnMoreLink = screen.getByRole('link', { name: 'Learn more' });
  expect(learnMoreLink).toHaveAttribute(
    'href',
    'https://en.wikipedia.org/wiki/Falcon_1'
  );
});

test('renders Inactive indicator if rocket is no longer in use', () => {
  render(<RocketInfo rocket={MockFalcon1} />);
  const operationalStatusIndicator = screen.getByText('Inactive', {
    selector: 'span',
  });
  expect(operationalStatusIndicator).toBeInTheDocument();
});

test('renders Active indicator if rocket is in use', () => {
  render(<RocketInfo rocket={{ ...MockFalcon1, active: true }} />);
  const operationalStatusIndicator = screen.getByText('Active', {
    selector: 'span',
  });
  expect(operationalStatusIndicator).toBeInTheDocument();
});
