'use client';

import { useState } from 'react';
import { useQuests } from '@/components/providers/QuestContext';
import { useFamily } from '@/components/providers/FamilyContext';
import { useNavigation } from '@/components/providers/AppProvider';
import QuestCard from '@/components/cards/QuestCard';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function WeeklyQuestScreen() {
  const { state, dispatch } = useQuests();
  const { getMember } = useFamily();
  const { navigateTo } = useNavigation();
  const [completionNote, setCompletionNote] = useState('');
  const [showComplete, setShowComplete] = useState(false);

  const weeklyQuest = state.weeklyQuest;
  const familyQuest = weeklyQuest
    ? state.library.find(fq => fq.id === weeklyQuest.familyQuestId)
    : null;
  const picker = weeklyQuest ? getMember(weeklyQuest.pickedBy) : null;

  if (!weeklyQuest || !familyQuest) {
    return (
      <div className="p-4 space-y-4">
        <button onClick={() => navigateTo('home', 'right')} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm">
          ← Back
        </button>
        <EmptyState
          emoji="🎯"
          title="No quest this week"
          description="Pick a quest from your library for the family to do together."
          action={
            <Button onClick={() => navigateTo('quest-library')} variant="primary" size="sm">
              Browse Quest Library
            </Button>
          }
        />

        {/* Recent history */}
        {state.weeklyHistory.length > 0 && (
          <div>
            <h2 className="font-bold text-stone-800 mb-3">Recent Quests</h2>
            <div className="space-y-2">
              {state.weeklyHistory.slice(0, 5).map(wq => {
                const fq = state.library.find(f => f.id === wq.familyQuestId);
                if (!fq) return null;
                return (
                  <div key={wq.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className={wq.status === 'completed' ? 'text-green-500' : 'text-stone-300'}>
                        {wq.status === 'completed' ? '✓' : '–'}
                      </span>
                      <p className="font-medium text-stone-800">{fq.quest.title}</p>
                    </div>
                    {wq.note && <p className="text-stone-500 text-sm mt-1 ml-6 italic">{wq.note}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <button onClick={() => navigateTo('home', 'right')} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm">
        ← Back
      </button>

      <div className="text-center mb-2">
        <h1 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">This Week&apos;s Quest</h1>
        {picker && (
          <p className="text-xs text-stone-400 mt-1">Picked by {picker.avatar} {picker.name}</p>
        )}
      </div>

      <QuestCard familyQuest={familyQuest} getMember={getMember} />

      {!showComplete ? (
        <div className="flex gap-3">
          <Button
            onClick={() => setShowComplete(true)}
            variant="success"
            fullWidth
            size="lg"
          >
            ✓ We did it!
          </Button>
          <Button
            onClick={() => { dispatch({ type: 'SKIP_WEEKLY' }); navigateTo('home', 'right'); }}
            variant="ghost"
            size="lg"
          >
            Skip
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3 animate-float-in">
          <h3 className="font-bold text-stone-800">Nice work! Any notes?</h3>
          <textarea
            value={completionNote}
            onChange={e => setCompletionNote(e.target.value)}
            placeholder="How did it go? (optional)"
            className="w-full h-20 p-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 resize-none text-sm"
          />
          <Button
            onClick={() => {
              dispatch({ type: 'COMPLETE_WEEKLY', note: completionNote || undefined });
              navigateTo('home', 'right');
            }}
            variant="success"
            fullWidth
          >
            Complete Quest
          </Button>
        </div>
      )}
    </div>
  );
}
