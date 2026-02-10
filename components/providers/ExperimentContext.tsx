'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Experiment, ExperimentCheckIn, Reaction, CheckInFrequency, ExperimentStatus } from '@/lib/types';
import { loadState, saveState, generateId } from '@/lib/storage';

interface ExperimentState {
  experiments: Experiment[];
}

type ExperimentAction =
  | { type: 'SET_EXPERIMENTS'; experiments: Experiment[] }
  | { type: 'CREATE'; title: string; description?: string; durationDays: number; checkInFrequency: CheckInFrequency; memberId: string; isFamily?: boolean }
  | { type: 'CHECK_IN'; experimentId: string; note?: string; status: ExperimentCheckIn['status'] }
  | { type: 'COMPLETE'; experimentId: string; reflection?: string }
  | { type: 'PAUSE'; experimentId: string }
  | { type: 'RESUME'; experimentId: string }
  | { type: 'ABANDON'; experimentId: string; reflection?: string }
  | { type: 'TOGGLE_VISIBILITY'; experimentId: string }
  | { type: 'ADD_REACTION'; experimentId: string; reaction: Omit<Reaction, 'reactedAt'> };

const initialState: ExperimentState = { experiments: [] };

function reducer(state: ExperimentState, action: ExperimentAction): ExperimentState {
  switch (action.type) {
    case 'SET_EXPERIMENTS':
      return { experiments: action.experiments };
    case 'CREATE': {
      const exp: Experiment = {
        id: generateId('exp'),
        memberId: action.memberId,
        title: action.title,
        description: action.description,
        durationDays: action.durationDays,
        startDate: new Date().toISOString(),
        checkInFrequency: action.checkInFrequency,
        status: 'active',
        checkIns: [],
        familyVisible: action.isFamily ?? false,
        isFamily: action.isFamily ?? false,
        reactions: [],
      };
      return { experiments: [exp, ...state.experiments] };
    }
    case 'CHECK_IN':
      return {
        experiments: state.experiments.map(e =>
          e.id === action.experimentId
            ? {
                ...e,
                checkIns: [
                  ...e.checkIns,
                  { id: generateId('ci'), date: new Date().toISOString(), note: action.note, status: action.status },
                ],
              }
            : e
        ),
      };
    case 'COMPLETE':
      return {
        experiments: state.experiments.map(e =>
          e.id === action.experimentId
            ? { ...e, status: 'completed' as ExperimentStatus, completedAt: new Date().toISOString(), reflection: action.reflection }
            : e
        ),
      };
    case 'PAUSE':
      return {
        experiments: state.experiments.map(e =>
          e.id === action.experimentId ? { ...e, status: 'paused' as ExperimentStatus } : e
        ),
      };
    case 'RESUME':
      return {
        experiments: state.experiments.map(e =>
          e.id === action.experimentId ? { ...e, status: 'active' as ExperimentStatus } : e
        ),
      };
    case 'ABANDON':
      return {
        experiments: state.experiments.map(e =>
          e.id === action.experimentId
            ? { ...e, status: 'abandoned' as ExperimentStatus, reflection: action.reflection }
            : e
        ),
      };
    case 'TOGGLE_VISIBILITY':
      return {
        experiments: state.experiments.map(e =>
          e.id === action.experimentId ? { ...e, familyVisible: !e.familyVisible } : e
        ),
      };
    case 'ADD_REACTION':
      return {
        experiments: state.experiments.map(e =>
          e.id === action.experimentId
            ? {
                ...e,
                reactions: [
                  ...e.reactions.filter(r => r.memberId !== action.reaction.memberId),
                  { ...action.reaction, reactedAt: new Date().toISOString() },
                ],
              }
            : e
        ),
      };
    default:
      return state;
  }
}

interface ExperimentContextValue {
  state: ExperimentState;
  dispatch: React.Dispatch<ExperimentAction>;
  activeExperiments: Experiment[];
  completedExperiments: Experiment[];
  memberExperiments: (memberId: string) => Experiment[];
  familyVisibleExperiments: Experiment[];
}

const ExperimentContext = createContext<ExperimentContextValue | null>(null);

export function ExperimentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const experiments = loadState<Experiment[]>('experiments');
    if (experiments) dispatch({ type: 'SET_EXPERIMENTS', experiments });
  }, []);

  useEffect(() => {
    saveState('experiments', state.experiments);
  }, [state.experiments]);

  const activeExperiments = state.experiments.filter(e => e.status === 'active');
  const completedExperiments = state.experiments.filter(e => e.status === 'completed');
  const memberExperiments = (memberId: string) => state.experiments.filter(e => e.memberId === memberId);
  const familyVisibleExperiments = state.experiments.filter(e => e.familyVisible && e.status === 'active');

  return (
    <ExperimentContext.Provider value={{ state, dispatch, activeExperiments, completedExperiments, memberExperiments, familyVisibleExperiments }}>
      {children}
    </ExperimentContext.Provider>
  );
}

export function useExperiments() {
  const ctx = useContext(ExperimentContext);
  if (!ctx) throw new Error('useExperiments must be used within ExperimentProvider');
  return ctx;
}
