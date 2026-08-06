import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import type { LaunchesResponse } from './types/launch';

const response: LaunchesResponse = {
  launches: [
    {
      flight_number: 1,
      mission_name: 'FalconSat',
      details: 'Engine failure at 33 seconds and loss of vehicle',
      links: { mission_patch: 'patch.png', mission_patch_small: 'small.png' },
      rocket: { rocket_name: 'Falcon 1' },
    },
    {
      flight_number: 2,
      mission_name: 'DemoSat',
      details: 'Successful first stage burn',
      links: { mission_patch: 'patch2.png', mission_patch_small: 'small2.png' },
      rocket: { rocket_name: 'Falcon 1' },
    },
  ],
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('рендерит список запусков после загрузки', async () => {
    render(<App />);

    expect(await screen.findByText('FalconSat')).toBeInTheDocument();
    expect(screen.getByText('DemoSat')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'See more' })).toHaveLength(2);
  });

  it('открывает модальное окно по клику на See more', async () => {
    const user = userEvent.setup();
    render(<App />);

    const buttons = await screen.findAllByRole('button', { name: 'See more' });
    await user.click(buttons[0]);

    expect(screen.getByText('Mission name:')).toBeInTheDocument();
    expect(screen.getByText('Rocket name:')).toBeInTheDocument();
    expect(screen.getByText('Details:')).toBeInTheDocument();
    expect(
      screen.getByText('Engine failure at 33 seconds and loss of vehicle'),
    ).toBeInTheDocument();
  });

  it('закрывает модальное окно по крестику', async () => {
    const user = userEvent.setup();
    render(<App />);

    const buttons = await screen.findAllByRole('button', { name: 'See more' });
    await user.click(buttons[0]);
    expect(screen.getByText('Mission name:')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => {
      expect(screen.queryByText('Mission name:')).not.toBeInTheDocument();
    });
  });
});