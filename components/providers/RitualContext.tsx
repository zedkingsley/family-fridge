'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { SpotlightState, TurnState, TonightsQuestion } from '@/lib/types';
import { loadState, saveState, generateId } from '@/lib/storage';

interface RitualState {
  spotlight: SpotlightState;
  turns: TurnState;
  tonightsQuestion: TonightsQuestion | null;
  questionHistory: string[];
}

type RitualAction =
  | { type: 'SET_STATE'; state: Partial<RitualState> }
  | { type: 'PASS_SPOTLIGHT'; to: string; from: string; reason: string }
  | { type: 'PICK_QUESTION'; questionId: string; questionText: string; category: string; pickedBy: string }
  | { type: 'MARK_DISCUSSED' }
  | { type: 'ADVANCE_QUESTION_PICKER' }
  | { type: 'ADVANCE_QUEST_PICKER' }
  | { type: 'SET_TURN_ORDER'; questionPickerOrder: string[]; questPickerOrder: string[] };

const initialState: RitualState = {
  spotlight: { currentHolder: '', heldSince: new Date().toISOString(), history: [] },
  turns: { questionPickerOrder: [], questionPickerIndex: 0, questPickerOrder: [], questPickerIndex: 0 },
  tonightsQuestion: null,
  questionHistory: [],
};

function reducer(state: RitualState, action: RitualAction): RitualState {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, ...action.state };
    case 'PASS_SPOTLIGHT':
      return {
        ...state,
        spotlight: {
          currentHolder: action.to,
          heldSince: new Date().toISOString(),
          history: [
            { id: generateId('sp'), from: action.from, to: action.to, reason: action.reason, passedAt: new Date().toISOString() },
            ...state.spotlight.history,
          ],
        },
      };
    case 'PICK_QUESTION':
      return {
        ...state,
        tonightsQuestion: {
          questionId: action.questionId,
          questionText: action.questionText,
          category: action.category as TonightsQuestion['category'],
          pickedBy: action.pickedBy,
          date: new Date().toISOString().split('T')[0],
          discussed: false,
        },
        questionHistory: [...state.questionHistory, action.questionId],
      };
    case 'MARK_DISCUSSED':
      return {
        ...state,
        tonightsQuestion: state.tonightsQuestion
          ? { ...state.tonightsQuestion, discussed: true }
          : null,
      };
    case 'ADVANCE_QUESTION_PICKER':
      return {
        ...state,
        turns: {
          ...state.turns,
          questionPickerIndex: (state.turns.questionPickerIndex + 1) % state.turns.questionPickerOrder.length,
        },
      };
    case 'ADVANCE_QUEST_PICKER':
      return {
        ...state,
        turns: {
          ...state.turns,
          questPickerIndex: (state.turns.questPickerIndex + 1) % state.turns.questPickerOrder.length,
        },
      };
    case 'SET_TURN_ORDER':
      return {
        ...state,
        turns: {
          ...state.turns,
          questionPickerOrder: action.questionPickerOrder,
          questPickerOrder: action.questPickerOrder,
        },
      };
    default:
      return state;
  }
}

interface RitualContextValue {
  state: RitualState;
  dispatch: React.Dispatch<RitualAction>;
  currentQuestionPicker: string;
  currentQuestPicker: string;
  spotlightDaysHeld: number;
}

const RitualContext = createContext<RitualContextValue | null>(null);

export function RitualProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const spotlight = loadState<SpotlightState>('spotlight');
    const turns = loadState<TurnState>('turns');
    const question = loadState<TonightsQuestion>('tonightsQuestion');
    const history = loadState<string[]>('questionHistory');

    const partialState: Partial<RitualState> = {};
    if (spotlight) partialState.spotlight = spotlight;
    if (turns) partialState.turns = turns;
    if (question) partialState.tonightsQuestion = question;
    if (history) partialState.questionHistory = history;

    if (Object.keys(partialState).length > 0) {
      dispatch({ type: 'SET_STATE', state: partialState });
    }
  }, []);

  useEffect(() => {
    saveState('spotlight', state.spotlight);
    saveState('turns', state.turns);
    saveState('tonightsQuestion', state.tonightsQuestion);
    saveState('questionHistory', state.questionHistory);
  }, [state]);

  const currentQuestionPicker = state.turns.questionPickerOrder[state.turns.questionPickerIndex] ?? '';
  const currentQuestPicker = state.turns.questPickerOrder[state.turns.questPickerIndex] ?? '';

  const spotlightDaysHeld = state.spotlight.heldSince
    ? Math.floor((Date.now() - new Date(state.spotlight.heldSince).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <RitualContext.Provider value={{ state, dispatch, currentQuestionPicker, currentQuestPicker, spotlightDaysHeld }}>
      {children}
    </RitualContext.Provider>
  );
}

export function useRituals() {
  const ctx = useContext(RitualContext);
  if (!ctx) throw new Error('useRituals must be used within RitualProvider');
  return ctx;
}
