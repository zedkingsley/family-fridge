// ============================================================
// Family Fridge — Badge Definitions
// ============================================================

import { Badge } from './types';

export const BADGES: Badge[] = [
  { id: 'quote-catcher-1', name: 'Quote Catcher', emoji: '💬', description: 'Captured 5 quotes', requirement: 5, category: 'quotes' },
  { id: 'quote-catcher-2', name: 'Quote Collector', emoji: '📝', description: 'Captured 15 quotes', requirement: 15, category: 'quotes' },
  { id: 'quote-catcher-3', name: 'Quote Master', emoji: '🏆', description: 'Captured 30 quotes', requirement: 30, category: 'quotes' },
  { id: 'quest-completer-1', name: 'Quest Starter', emoji: '🎯', description: 'Completed 3 quests', requirement: 3, category: 'quests' },
  { id: 'quest-completer-2', name: 'Quest Completer', emoji: '⭐', description: 'Completed 10 quests', requirement: 10, category: 'quests' },
  { id: 'wisdom-seeker-1', name: 'Wisdom Seeker', emoji: '📚', description: 'Collected 10 pieces of wisdom', requirement: 10, category: 'wisdom' },
  { id: 'wisdom-seeker-2', name: 'Wisdom Keeper', emoji: '🦉', description: 'Collected 25 pieces of wisdom', requirement: 25, category: 'wisdom' },
  { id: 'spotlight-star-1', name: 'Spotlight Star', emoji: '🌟', description: 'Received the spotlight 3 times', requirement: 3, category: 'spotlight' },
  { id: 'spotlight-star-2', name: 'Shining Light', emoji: '✨', description: 'Received the spotlight 10 times', requirement: 10, category: 'spotlight' },
  { id: 'experimenter-1', name: 'Experimenter', emoji: '🧪', description: 'Completed 1 experiment', requirement: 1, category: 'experiments' },
  { id: 'experimenter-2', name: 'Growth Mindset', emoji: '🌱', description: 'Completed 3 experiments', requirement: 3, category: 'experiments' },
  { id: 'experimenter-3', name: 'Transformer', emoji: '🦋', description: 'Completed 5 experiments', requirement: 5, category: 'experiments' },
];
