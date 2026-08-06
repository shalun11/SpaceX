import { useEffect, useReducer } from 'react';
import { initialLaunchesState, launchesReducer } from '../state/launchesReducer';
import type { LaunchesResponse } from '../types/launch';

const API_URL = 'https://kata-spacex.onrender.com/api/launches';
const MAX_ATTEMPTS = 6;
const RETRY_DELAY_MS = 10000;

async function fetchLaunches(): Promise<LaunchesResponse> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return (await response.json()) as LaunchesResponse;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }

  throw lastError ?? new Error('Unknown error');
}

export function useLaunches() {
  const [state, dispatch] = useReducer(launchesReducer, initialLaunchesState);

  useEffect(() => {
    let cancelled = false;

    dispatch({ type: 'fetch/start' });

    fetchLaunches()
      .then((data) => {
        if (cancelled) return;
        dispatch({ type: 'fetch/success', payload: data.launches });
      })
      .catch((error: Error) => {
        if (cancelled) return;
        dispatch({ type: 'fetch/error', payload: error.message });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { state, dispatch };
}