import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RocketLookup from '../RocketLookup';
import MockRockets from '../../../mocks/Rockets.mock';

test("renders multiple rockets' information in a grid", () => {
  render(<RocketLookup rockets={MockRockets} />);
  const rocketInfoGrid = screen.getByTestId('rocket-info-grid');
  const rockets = within(rocketInfoGrid).getAllByTestId('rocket-info');
  expect(rockets.length).toBe(4);
});

describe('filtering UI', () => {
  test('can filter active rockets', async () => {
    const user = userEvent.setup();
    render(<RocketLookup rockets={MockRockets} />);
    expect(screen.getAllByTestId('rocket-info').length).toBe(4);
    const activeFilter = screen.getByText('Filter Active Rockets');
    await user.click(activeFilter);
    expect(screen.getAllByTestId('rocket-info').length).toBe(2);
    await user.click(activeFilter);
    expect(screen.getAllByTestId('rocket-info').length).toBe(4);
  });

  test('can filter by merlin engines', async () => {
    const user = userEvent.setup();
    render(<RocketLookup rockets={MockRockets} />);
    expect(screen.getAllByTestId('rocket-info').length).toBe(4);
    const engineFilter = screen.getByText('Filter Merlin Engines');
    await user.click(engineFilter);
    expect(screen.getAllByTestId('rocket-info').length).toBe(3);
    await user.click(engineFilter);
    expect(screen.getAllByTestId('rocket-info').length).toBe(4);
  });

  test('can clear filters after being selected', async () => {
    const user = userEvent.setup();
    render(<RocketLookup rockets={MockRockets} />);
    expect(screen.getAllByTestId('rocket-info').length).toBe(4);
    const activeFilter = screen.getByText('Filter Active Rockets');
    const engineFilter = screen.getByText('Filter Merlin Engines');
    await user.click(activeFilter);
    await user.click(engineFilter);
    expect(screen.getAllByTestId('rocket-info').length).toBe(2);
    const clearAllFilters = screen.getByText('Clear All Filters');
    await user.click(clearAllFilters);
    expect(screen.getAllByTestId('rocket-info').length).toBe(4);
  });
});

describe('sorting UI', () => {
  test('can sort rockets by cost per launch', async () => {
    const user = userEvent.setup();
    render(<RocketLookup rockets={MockRockets} />);
    expect(screen.getAllByTestId('rocket-info')[0]).toHaveTextContent(
      'Cost Per Launch: $6,700,000.00'
    );
    const sortByCost = screen.getByRole('button', { name: 'Cost Per Launch' });
    await user.click(sortByCost);
    expect(screen.getAllByTestId('rocket-info')[0]).toHaveTextContent(
      'Cost Per Launch: $6,700,000.00'
    );
    await user.click(sortByCost);
    expect(screen.getAllByTestId('rocket-info')[0]).toHaveTextContent(
      'Cost Per Launch: $90,000,000.00'
    );
  });
  test('can sort rockets by # of engines', async () => {
    const user = userEvent.setup();
    render(<RocketLookup rockets={MockRockets} />);
    expect(screen.getAllByTestId('rocket-info')[0]).toHaveTextContent(
      '1 merlin Engines'
    );
    const sortByNumberOfEngines = screen.getByRole('button', {
      name: '# of Engines',
    });
    await user.click(sortByNumberOfEngines);
    expect(screen.getAllByTestId('rocket-info')[0]).toHaveTextContent(
      '1 merlin Engines'
    );
    await user.click(sortByNumberOfEngines);
    expect(screen.getAllByTestId('rocket-info')[0]).toHaveTextContent(
      '37 raptor Engines'
    );
  });
  test('can reset sort order after sorting', async () => {
    const user = userEvent.setup();
    render(<RocketLookup rockets={MockRockets} />);
    expect(screen.getAllByTestId('rocket-info')[0]).toHaveTextContent(
      '1 merlin Engines'
    );
    const sortByNumberOfEngines = screen.getByRole('button', {
      name: '# of Engines',
    });
    await user.click(sortByNumberOfEngines);
    await user.click(sortByNumberOfEngines);
    expect(screen.getAllByTestId('rocket-info')[0]).toHaveTextContent(
      '37 raptor Engines'
    );
    const clearAllFilters = screen.getByText('Reset Sort Order');
    await user.click(clearAllFilters);
    expect(screen.getAllByTestId('rocket-info')[0]).toHaveTextContent(
      '1 merlin Engines'
    );
  });
});
