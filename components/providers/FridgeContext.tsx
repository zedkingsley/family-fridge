'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { FridgeItem, FridgeStatus, Reaction, VibeEmoji } from '@/lib/types';
import { loadState, saveState, generateId } from '@/lib/storage';

interface FridgeState {
  items: FridgeItem[];
}

type FridgeAction =
  | { type: 'SET_ITEMS'; items: FridgeItem[] }
  | { type: 'ADD_ITEM'; item: Omit<FridgeItem, 'id' | 'createdAt' | 'updatedAt' | 'reactions'> }
  | { type: 'UPDATE_STATUS'; itemId: string; status: FridgeStatus }
  | { type: 'ADD_REACTION'; itemId: string; reaction: Omit<Reaction, 'reactedAt'> }
  | { type: 'REMOVE_REACTION'; itemId: string; memberId: string }
  | { type: 'TAG_VALUE'; itemId: string; valueId: string | undefined }
  | { type: 'DELETE_ITEM'; itemId: string };

const initialState: FridgeState = { items: [] };

function reducer(state: FridgeState, action: FridgeAction): FridgeState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { items: action.items };
    case 'ADD_ITEM': {
      const now = new Date().toISOString();
      const item: FridgeItem = {
        ...action.item,
        id: generateId('fridge'),
        reactions: [],
        createdAt: now,
        updatedAt: now,
      };
      return { items: [item, ...state.items] };
    }
    case 'UPDATE_STATUS':
      return {
        items: state.items.map(i =>
          i.id === action.itemId
            ? { ...i, status: action.status, updatedAt: new Date().toISOString() }
            : i
        ),
      };
    case 'ADD_REACTION':
      return {
        items: state.items.map(i =>
          i.id === action.itemId
            ? {
                ...i,
                reactions: [
                  ...i.reactions.filter(r => r.memberId !== action.reaction.memberId),
                  { ...action.reaction, reactedAt: new Date().toISOString() },
                ],
              }
            : i
        ),
      };
    case 'REMOVE_REACTION':
      return {
        items: state.items.map(i =>
          i.id === action.itemId
            ? { ...i, reactions: i.reactions.filter(r => r.memberId !== action.memberId) }
            : i
        ),
      };
    case 'TAG_VALUE':
      return {
        items: state.items.map(i =>
          i.id === action.itemId
            ? { ...i, valueTag: action.valueId, updatedAt: new Date().toISOString() }
            : i
        ),
      };
    case 'DELETE_ITEM':
      return { items: state.items.filter(i => i.id !== action.itemId) };
    default:
      return state;
  }
}

interface FridgeContextValue {
  state: FridgeState;
  dispatch: React.Dispatch<FridgeAction>;
  pinnedItems: FridgeItem[];
  rotationItems: FridgeItem[];
  personalItems: FridgeItem[];
  archivedItems: FridgeItem[];
  addQuote: (content: string, saidBy: string, capturedBy: string, emoji: VibeEmoji) => void;
  addWisdom: (content: string, source: string, capturedBy: string, pillar?: string) => void;
  addNote: (content: string, capturedBy: string) => void;
}

const FridgeContext = createContext<FridgeContextValue | null>(null);

export function FridgeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const items = loadState<FridgeItem[]>('fridge');
    if (items) dispatch({ type: 'SET_ITEMS', items });
  }, []);

  useEffect(() => {
    if (state.items.length > 0) {
      saveState('fridge', state.items);
    }
  }, [state.items]);

  const pinnedItems = state.items.filter(i => i.status === 'pinned');
  const rotationItems = state.items.filter(i => i.status === 'rotation');
  const personalItems = state.items.filter(i => i.status === 'personal');
  const archivedItems = state.items.filter(i => i.status === 'archived');

  const addQuote = (content: string, saidBy: string, capturedBy: string, emoji: VibeEmoji) => {
    dispatch({ type: 'ADD_ITEM', item: { type: 'quote', content, saidBy, capturedBy, emoji, status: 'personal' } });
  };

  const addWisdom = (content: string, source: string, capturedBy: string, pillar?: string) => {
    dispatch({ type: 'ADD_ITEM', item: { type: 'wisdom', content, source, capturedBy, pillar, status: 'personal' } });
  };

  const addNote = (content: string, capturedBy: string) => {
    dispatch({ type: 'ADD_ITEM', item: { type: 'note', content, capturedBy, status: 'personal' } });
  };

  return (
    <FridgeContext.Provider value={{ state, dispatch, pinnedItems, rotationItems, personalItems, archivedItems, addQuote, addWisdom, addNote }}>
      {children}
    </FridgeContext.Provider>
  );
}

export function useFridge() {
  const ctx = useContext(FridgeContext);
  if (!ctx) throw new Error('useFridge must be used within FridgeProvider');
  return ctx;
}
