'use client';

import { useFridge } from '@/components/providers/FridgeContext';
import { useFamily } from '@/components/providers/FamilyContext';
import { useExperiments } from '@/components/providers/ExperimentContext';
import { useNavigation } from '@/components/providers/AppProvider';
import FridgeItemCard from '@/components/cards/FridgeItemCard';
import ExperimentCard from '@/components/cards/ExperimentCard';
import TabFilter from '@/components/ui/TabFilter';
import EmptyState from '@/components/ui/EmptyState';
import { useState } from 'react';

export default function MyBoardScreen() {
  const { state: fridgeState, dispatch: fridgeDispatch } = useFridge();
  const { state: familyState, getMember } = useFamily();
  const { memberExperiments, dispatch: expDispatch } = useExperiments();
  const { navigateTo } = useNavigation();
  const [tab, setTab] = useState('captures');

  const activeUser = familyState.activeUser || familyState.members[0]?.id || '';
  const myItems = fridgeState.items
    .filter(i => i.capturedBy === activeUser)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const myExperiments = memberExperiments(activeUser);

  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-stone-800">📋 My Board</h1>
        <p className="text-stone-500 text-sm">Your captures and experiments</p>
      </div>

      <TabFilter
        options={[
          { id: 'captures', label: 'Captures', emoji: '💬', count: myItems.length },
          { id: 'experiments', label: 'Experiments', emoji: '🧪', count: myExperiments.length },
        ]}
        selected={tab}
        onSelect={setTab}
      />

      {tab === 'captures' && (
        <div className="space-y-2">
          {myItems.length === 0 ? (
            <EmptyState
              emoji="💬"
              title="Nothing captured yet"
              description="Tap the quote button to capture something someone said."
            />
          ) : (
            myItems.map(item => (
              <FridgeItemCard
                key={item.id}
                item={item}
                getMember={getMember}
                currentUserId={activeUser}
                showActions
                onPromote={(id, status) => fridgeDispatch({ type: 'UPDATE_STATUS', itemId: id, status })}
                onReact={(itemId, emoji) => fridgeDispatch({ type: 'ADD_REACTION', itemId, reaction: { memberId: activeUser, emoji } })}
                onRemoveReaction={(itemId) => fridgeDispatch({ type: 'REMOVE_REACTION', itemId, memberId: activeUser })}
              />
            ))
          )}
        </div>
      )}

      {tab === 'experiments' && (
        <div className="space-y-3">
          <button
            onClick={() => navigateTo('experiment')}
            className="w-full bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border-2 border-dashed border-purple-200 text-left hover:border-purple-300 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧪</span>
              <div>
                <p className="font-semibold text-stone-800">Start a New Experiment</p>
                <p className="text-stone-500 text-xs">Challenge yourself to grow</p>
              </div>
            </div>
          </button>

          {myExperiments.length === 0 ? (
            <EmptyState
              emoji="🧪"
              title="No experiments yet"
              description="Try something new for a set number of days."
            />
          ) : (
            myExperiments.map(exp => (
              <ExperimentCard
                key={exp.id}
                experiment={exp}
                getMember={getMember}
                currentUserId={activeUser}
                onCheckIn={() => navigateTo('experiment')}
                onPause={() => expDispatch({ type: 'PAUSE', experimentId: exp.id })}
                onResume={() => expDispatch({ type: 'RESUME', experimentId: exp.id })}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
