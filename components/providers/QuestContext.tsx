'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { FamilyQuest, WeeklyQuest, Quest } from '@/lib/types';
import { loadState, saveState, generateId } from '@/lib/storage';

interface QuestState {
  library: FamilyQuest[];
  weeklyQuest: WeeklyQuest | null;
  weeklyHistory: WeeklyQuest[];
}

type QuestAction =
  | { type: 'SET_STATE'; state: Partial<QuestState> }
  | { type: 'ADD_TO_LIBRARY'; quest: Quest; packId: string; addedBy: string }
  | { type: 'REMOVE_FROM_LIBRARY'; familyQuestId: string }
  | { type: 'TOGGLE_FAVORITE'; familyQuestId: string }
  | { type: 'ARCHIVE_QUEST'; familyQuestId: string }
  | { type: 'PICK_WEEKLY'; familyQuestId: string; pickedBy: string }
  | { type: 'COMPLETE_WEEKLY'; note?: string }
  | { type: 'SKIP_WEEKLY' }
  | { type: 'ADD_CUSTOM_QUEST'; quest: Quest; addedBy: string };

const initialState: QuestState = {
  library: [],
  weeklyQuest: null,
  weeklyHistory: [],
};

function reducer(state: QuestState, action: QuestAction): QuestState {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.state };
    case 'ADD_TO_LIBRARY': {
      const existing = state.library.find(fq => fq.questId === action.quest.id);
      if (existing) return state;
      const fq: FamilyQuest = {
        id: generateId('fq'),
        questId: action.quest.id,
        packId: action.packId,
        quest: action.quest,
        addedBy: action.addedBy,
        addedAt: new Date().toISOString(),
        status: 'available',
        completions: [],
      };
      return { ...state, library: [...state.library, fq] };
    }
    case 'REMOVE_FROM_LIBRARY':
      return { ...state, library: state.library.filter(fq => fq.id !== action.familyQuestId) };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        library: state.library.map(fq =>
          fq.id === action.familyQuestId
            ? { ...fq, status: fq.status === 'favorite' ? 'available' : 'favorite' }
            : fq
        ),
      };
    case 'ARCHIVE_QUEST':
      return {
        ...state,
        library: state.library.map(fq =>
          fq.id === action.familyQuestId ? { ...fq, status: 'archived' } : fq
        ),
      };
    case 'PICK_WEEKLY': {
      const now = new Date();
      const day = now.getDay();
      const diff = now.getDate() - day;
      const weekStart = new Date(now.getFullYear(), now.getMonth(), diff);
      const wq: WeeklyQuest = {
        id: generateId('wq'),
        familyQuestId: action.familyQuestId,
        pickedBy: action.pickedBy,
        weekStart: weekStart.toISOString(),
        status: 'active',
      };
      return {
        ...state,
        weeklyQuest: wq,
      };
    }
    case 'COMPLETE_WEEKLY': {
      if (!state.weeklyQuest) return state;
      const completed: WeeklyQuest = {
        ...state.weeklyQuest,
        status: 'completed',
        completedAt: new Date().toISOString(),
        note: action.note,
      };
      // Also update the family quest completion
      const fqId = state.weeklyQuest.familyQuestId;
      return {
        ...state,
        weeklyQuest: null,
        weeklyHistory: [completed, ...state.weeklyHistory],
        library: state.library.map(fq =>
          fq.id === fqId
            ? {
                ...fq,
                status: fq.status === 'favorite' ? 'favorite' : 'completed',
                completions: [
                  ...fq.completions,
                  { id: generateId('qc'), completedAt: new Date().toISOString(), note: action.note },
                ],
              }
            : fq
        ),
      };
    }
    case 'SKIP_WEEKLY':
      if (!state.weeklyQuest) return state;
      return {
        ...state,
        weeklyQuest: null,
        weeklyHistory: [{ ...state.weeklyQuest, status: 'skipped' }, ...state.weeklyHistory],
      };
    case 'ADD_CUSTOM_QUEST': {
      const fq: FamilyQuest = {
        id: generateId('fq'),
        questId: action.quest.id,
        packId: 'custom',
        quest: action.quest,
        addedBy: action.addedBy,
        addedAt: new Date().toISOString(),
        status: 'available',
        completions: [],
      };
      return { ...state, library: [...state.library, fq] };
    }
    default:
      return state;
  }
}

interface QuestContextValue {
  state: QuestState;
  dispatch: React.Dispatch<QuestAction>;
  availableQuests: FamilyQuest[];
  completedQuests: FamilyQuest[];
  favoriteQuests: FamilyQuest[];
}

const QuestContext = createContext<QuestContextValue | null>(null);

export function QuestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const library = loadState<FamilyQuest[]>('questLibrary');
    const weeklyQuest = loadState<WeeklyQuest>('weeklyQuest');
    const weeklyHistory = loadState<WeeklyQuest[]>('weeklyHistory');

    const partialState: Partial<QuestState> = {};
    if (library) partialState.library = library;
    if (weeklyQuest) partialState.weeklyQuest = weeklyQuest;
    if (weeklyHistory) partialState.weeklyHistory = weeklyHistory;

    if (Object.keys(partialState).length > 0) {
      dispatch({ type: 'SET_STATE', state: partialState });
    }
  }, []);

  useEffect(() => {
    saveState('questLibrary', state.library);
    saveState('weeklyQuest', state.weeklyQuest);
    saveState('weeklyHistory', state.weeklyHistory);
  }, [state]);

  const availableQuests = state.library.filter(fq => fq.status === 'available' || fq.status === 'favorite');
  const completedQuests = state.library.filter(fq => fq.status === 'completed' || fq.completions.length > 0);
  const favoriteQuests = state.library.filter(fq => fq.status === 'favorite');

  return (
    <QuestContext.Provider value={{ state, dispatch, availableQuests, completedQuests, favoriteQuests }}>
      {children}
    </QuestContext.Provider>
  );
}

export function useQuests() {
  const ctx = useContext(QuestContext);
  if (!ctx) throw new Error('useQuests must be used within QuestProvider');
  return ctx;
}
