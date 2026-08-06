import type { Launch } from '../types/launch';

export interface LaunchesState {
  launches: Launch[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  selectedLaunch: Launch | null;
}

export type LaunchesAction =
  | { type: 'fetch/start' }
  | { type: 'fetch/success'; payload: Launch[] }
  | { type: 'fetch/error'; payload: string }
  | { type: 'modal/open'; payload: Launch }
  | { type: 'modal/close' };

export const initialLaunchesState: LaunchesState = {
  launches: [],
  status: 'idle',
  error: null,
  selectedLaunch: null,
};

export function launchesReducer(state: LaunchesState, action: LaunchesAction): LaunchesState {
  switch (action.type) {
    case 'fetch/start':
      return { ...state, status: 'loading', error: null };
    case 'fetch/success':
      return { ...state, status: 'success', launches: action.payload };
    case 'fetch/error':
      return { ...state, status: 'error', error: action.payload };
    case 'modal/open':
      return { ...state, selectedLaunch: action.payload };
    case 'modal/close':
      return { ...state, selectedLaunch: null };
  }
}