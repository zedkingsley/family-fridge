// ============================================================
// Family Fridge — Sample / Demo Data
// ============================================================

import { FamilyMember, FridgeItem, SpotlightState, TurnState, FamilyValue, TonightsQuestion } from './types';

export const SAMPLE_FAMILY: FamilyMember[] = [
  { id: 'dad', name: 'Dad', avatar: '👨', color: '#3B82F6', birthdate: '1988-03-15', role: 'parent' },
  { id: 'mom', name: 'Mom', avatar: '👩', color: '#8B5CF6', birthdate: '1990-06-22', role: 'parent' },
  { id: 'wyatt', name: 'Wyatt', avatar: '👦', color: '#F59E0B', birthdate: '2018-01-10', role: 'child' },
  { id: 'eleanor', name: 'Eleanor', avatar: '👧', color: '#EC4899', birthdate: '2021-04-05', role: 'child' },
];

export const SAMPLE_FRIDGE_ITEMS: FridgeItem[] = [
  {
    id: 'item-1', type: 'wisdom', content: 'Know yourself, love yourself, be true to yourself.',
    source: 'Grandmother', pillar: 'identity', capturedBy: 'dad', status: 'pinned',
    reactions: [{ memberId: 'mom', emoji: '❤️', reactedAt: '2026-02-02T10:00:00.000Z' }],
    createdAt: '2026-02-01T10:00:00.000Z', updatedAt: '2026-02-01T10:00:00.000Z',
  },
  {
    id: 'item-2', type: 'quote', content: "If fish could walk they'd probably be rude about it",
    saidBy: 'wyatt', capturedBy: 'dad', emoji: '😂', status: 'pinned',
    reactions: [{ memberId: 'mom', emoji: '😂', reactedAt: '2026-02-08T18:00:00.000Z' }],
    createdAt: '2026-02-08T10:00:00.000Z', updatedAt: '2026-02-08T10:00:00.000Z',
  },
  {
    id: 'item-3', type: 'wisdom', content: 'Those who say yes are rewarded by adventures.',
    pillar: 'delight', source: 'Family wisdom', capturedBy: 'mom', status: 'pinned',
    reactions: [], createdAt: '2026-01-15T10:00:00.000Z', updatedAt: '2026-01-15T10:00:00.000Z',
  },
  {
    id: 'item-4', type: 'quote', content: "I think love is when you share your last cookie even when you're still hungry",
    saidBy: 'eleanor', capturedBy: 'mom', emoji: '🥹', status: 'rotation',
    reactions: [{ memberId: 'dad', emoji: '🥹', reactedAt: '2026-02-05T20:00:00.000Z' }],
    createdAt: '2026-02-05T10:00:00.000Z', updatedAt: '2026-02-05T10:00:00.000Z',
  },
  {
    id: 'item-5', type: 'wisdom', content: 'Effort is your birthright; outcome is not.',
    pillar: 'effort', source: 'Philosophy magnet', capturedBy: 'mom', status: 'rotation',
    reactions: [], createdAt: '2026-02-03T10:00:00.000Z', updatedAt: '2026-02-03T10:00:00.000Z',
  },
  {
    id: 'item-6', type: 'note', content: "I've been thinking about what it means to be brave",
    capturedBy: 'wyatt', status: 'rotation',
    reactions: [{ memberId: 'dad', emoji: '💪', reactedAt: '2026-02-07T18:00:00.000Z' }],
    createdAt: '2026-02-07T10:00:00.000Z', updatedAt: '2026-02-07T10:00:00.000Z',
  },
  {
    id: 'item-7', type: 'quote', content: "Dad, the moon is following us again!",
    saidBy: 'eleanor', capturedBy: 'dad', emoji: '🤔', status: 'rotation',
    reactions: [], createdAt: '2026-02-02T10:00:00.000Z', updatedAt: '2026-02-02T10:00:00.000Z',
  },
  {
    id: 'item-8', type: 'quote', content: "Why does the moon follow us in the car?",
    saidBy: 'eleanor', capturedBy: 'dad', emoji: '🤔', status: 'personal',
    reactions: [], createdAt: '2026-02-09T10:00:00.000Z', updatedAt: '2026-02-09T10:00:00.000Z',
  },
  {
    id: 'item-9', type: 'wisdom', content: 'Mistakes are gifts. They show you something true.',
    pillar: 'effort', source: 'Modern wisdom', capturedBy: 'dad', status: 'personal',
    reactions: [], createdAt: '2026-02-04T10:00:00.000Z', updatedAt: '2026-02-04T10:00:00.000Z',
  },
  {
    id: 'item-10', type: 'quote', content: "I'm not tired, my eyes are just resting",
    saidBy: 'wyatt', capturedBy: 'mom', emoji: '😂', status: 'personal',
    reactions: [], createdAt: '2026-02-06T10:00:00.000Z', updatedAt: '2026-02-06T10:00:00.000Z',
  },
  {
    id: 'item-11', type: 'quote', content: "Vegetables are just plants pretending to be food",
    saidBy: 'wyatt', capturedBy: 'dad', emoji: '😂', status: 'archived',
    reactions: [], createdAt: '2026-01-20T10:00:00.000Z', updatedAt: '2026-01-20T10:00:00.000Z',
  },
];

export const SAMPLE_SPOTLIGHT: SpotlightState = {
  currentHolder: 'wyatt',
  heldSince: '2026-02-06T10:00:00.000Z',
  history: [
    { id: 'sp-1', from: 'mom', to: 'wyatt', reason: 'For being such a great helper with Eleanor this week', passedAt: '2026-02-06T18:00:00.000Z' },
    { id: 'sp-2', from: 'dad', to: 'mom', reason: 'For making everyone laugh at dinner', passedAt: '2026-02-01T18:00:00.000Z' },
    { id: 'sp-3', from: 'wyatt', to: 'dad', reason: 'For teaching me to ride my bike', passedAt: '2026-01-25T18:00:00.000Z' },
  ],
};

export const SAMPLE_TURNS: TurnState = {
  questionPickerOrder: ['dad', 'mom', 'wyatt', 'eleanor'],
  questionPickerIndex: 3, // Eleanor's turn
  questPickerOrder: ['dad', 'mom', 'wyatt'],
  questPickerIndex: 0,
};

export const SAMPLE_VALUES: FamilyValue[] = [
  { id: 'val-1', emoji: '💪', title: 'Courage', description: 'We face hard things together', createdAt: '2026-01-15T10:00:00.000Z' },
  { id: 'val-2', emoji: '😂', title: 'Laughter', description: 'We find the funny in everything', createdAt: '2026-01-15T10:00:00.000Z' },
  { id: 'val-3', emoji: '🤝', title: 'Kindness', description: 'We treat everyone with care', createdAt: '2026-01-15T10:00:00.000Z' },
];

export const SAMPLE_TONIGHTS_QUESTION: TonightsQuestion = {
  questionId: 'q-1',
  questionText: 'What made you laugh today?',
  category: 'fun',
  pickedBy: 'dad',
  date: new Date().toISOString().split('T')[0],
  discussed: false,
};
