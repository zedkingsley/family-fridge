'use client';

import { useState } from 'react';
import { useQuests } from '@/components/providers/QuestContext';
import { useFamily } from '@/components/providers/FamilyContext';
import { useNavigation } from '@/components/providers/AppProvider';
import QuestCard from '@/components/cards/QuestCard';
import TabFilter from '@/components/ui/TabFilter';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function QuestLibraryScreen() {
  const { state, dispatch, availableQuests, completedQuests, favoriteQuests } = useQuests();
  const { getMember } = useFamily();
  const { navigateTo } = useNavigation();
  const [filter, setFilter] = useState('all');

  const filtered = (() => {
    switch (filter) {
      case 'available': return availableQuests;
      case 'completed': return completedQuests;
      case 'favorites': return favoriteQuests;
      default: return state.library.filter(fq => fq.status !== 'archived');
    }
  })();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => navigateTo('home', 'right')} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm">
          ← Back
        </button>
        <button
          onClick={() => navigateTo('weekly-quest')}
          className="text-amber-600 text-sm font-medium hover:text-amber-700"
        >
          This Week →
        </button>
      </div>

      <div>
        <h1 className="text-xl font-bold text-stone-800">🎯 Quest Library</h1>
        <p className="text-stone-500 text-sm">{state.library.length} quests collected</p>
      </div>

      <TabFilter
        options={[
          { id: 'all', label: 'All', count: state.library.filter(fq => fq.status !== 'archived').length },
          { id: 'available', label: 'Available', count: availableQuests.length },
          { id: 'favorites', label: 'Favorites', emoji: '★', count: favoriteQuests.length },
          { id: 'completed', label: 'Done', emoji: '✓', count: completedQuests.length },
        ]}
        selected={filter}
        onSelect={setFilter}
      />

      {filtered.length === 0 ? (
        <EmptyState
          emoji="🎯"
          title={state.library.length === 0 ? "No quests yet" : "No quests match this filter"}
          description={state.library.length === 0 ? "Browse Quest Packs in Discover to add quests." : undefined}
          action={
            state.library.length === 0 ? (
              <Button onClick={() => navigateTo('discover')} variant="primary" size="sm">
                Browse Quest Packs
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(fq => (
            <QuestCard
              key={fq.id}
              familyQuest={fq}
              getMember={getMember}
              onToggleFavorite={() => dispatch({ type: 'TOGGLE_FAVORITE', familyQuestId: fq.id })}
              onSelect={() => {
                dispatch({ type: 'PICK_WEEKLY', familyQuestId: fq.id, pickedBy: '' });
                navigateTo('weekly-quest');
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
