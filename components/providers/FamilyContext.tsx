'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { FamilyMember, FamilyValue, OnboardingState } from '@/lib/types';
import { loadState, saveState, generateId } from '@/lib/storage';

interface FamilyState {
  members: FamilyMember[];
  values: FamilyValue[];
  onboarding: OnboardingState;
  activeUser: string; // current user operating the app
}

type FamilyAction =
  | { type: 'SET_MEMBERS'; members: FamilyMember[] }
  | { type: 'ADD_MEMBER'; member: FamilyMember }
  | { type: 'UPDATE_MEMBER'; member: FamilyMember }
  | { type: 'REMOVE_MEMBER'; memberId: string }
  | { type: 'SET_VALUES'; values: FamilyValue[] }
  | { type: 'ADD_VALUE'; value: Omit<FamilyValue, 'id' | 'createdAt'> }
  | { type: 'REMOVE_VALUE'; valueId: string }
  | { type: 'SET_ONBOARDING'; onboarding: OnboardingState }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_ACTIVE_USER'; memberId: string }
  | { type: 'LOAD_DEMO' }
  | { type: 'RESET' };

const initialState: FamilyState = {
  members: [],
  values: [],
  onboarding: { completed: false, currentStep: 0, totalSteps: 7 },
  activeUser: '',
};

function reducer(state: FamilyState, action: FamilyAction): FamilyState {
  switch (action.type) {
    case 'SET_MEMBERS':
      return { ...state, members: action.members };
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.member] };
    case 'UPDATE_MEMBER':
      return { ...state, members: state.members.map(m => m.id === action.member.id ? action.member : m) };
    case 'REMOVE_MEMBER':
      return { ...state, members: state.members.filter(m => m.id !== action.memberId) };
    case 'SET_VALUES':
      return { ...state, values: action.values };
    case 'ADD_VALUE':
      return { ...state, values: [...state.values, { ...action.value, id: generateId('val'), createdAt: new Date().toISOString() }] };
    case 'REMOVE_VALUE':
      return { ...state, values: state.values.filter(v => v.id !== action.valueId) };
    case 'SET_ONBOARDING':
      return { ...state, onboarding: action.onboarding };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboarding: { ...state.onboarding, completed: true } };
    case 'SET_ACTIVE_USER':
      return { ...state, activeUser: action.memberId };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface FamilyContextValue {
  state: FamilyState;
  dispatch: React.Dispatch<FamilyAction>;
  getMember: (id: string) => FamilyMember | undefined;
}

const FamilyContext = createContext<FamilyContextValue | null>(null);

export function FamilyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const members = loadState<FamilyMember[]>('family');
    const values = loadState<FamilyValue[]>('values');
    const onboarding = loadState<OnboardingState>('onboarding');
    const activeUser = loadState<string>('activeUser');

    if (members) dispatch({ type: 'SET_MEMBERS', members });
    if (values) dispatch({ type: 'SET_VALUES', values });
    if (onboarding) dispatch({ type: 'SET_ONBOARDING', onboarding });
    if (activeUser) dispatch({ type: 'SET_ACTIVE_USER', memberId: activeUser });
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (state.members.length > 0) {
      saveState('family', state.members);
      saveState('values', state.values);
      saveState('onboarding', state.onboarding);
      if (state.activeUser) saveState('activeUser', state.activeUser);
    }
  }, [state.members, state.values, state.onboarding, state.activeUser]);

  const getMember = (id: string) => state.members.find(m => m.id === id);

  return (
    <FamilyContext.Provider value={{ state, dispatch, getMember }}>
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error('useFamily must be used within FamilyProvider');
  return ctx;
}
