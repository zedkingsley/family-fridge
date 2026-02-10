'use client';

import { useState } from 'react';
import { useExperiments } from '@/components/providers/ExperimentContext';
import { useFamily } from '@/components/providers/FamilyContext';
import { useNavigation } from '@/components/providers/AppProvider';
import ExperimentCard from '@/components/cards/ExperimentCard';
import Button from '@/components/ui/Button';
import TabFilter from '@/components/ui/TabFilter';
import EmptyState from '@/components/ui/EmptyState';
import { CheckInFrequency } from '@/lib/types';

type View = 'list' | 'create' | 'checkin';

export default function ExperimentScreen() {
  const { state, dispatch, activeExperiments, completedExperiments } = useExperiments();
  const { state: familyState, getMember } = useFamily();
  const { navigateTo } = useNavigation();

  const [view, setView] = useState<View>('list');
  const [tab, setTab] = useState('active');
  const [checkInExpId, setCheckInExpId] = useState<string | null>(null);
  const [checkInNote, setCheckInNote] = useState('');
  // Create form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(7);
  const [frequency, setFrequency] = useState<CheckInFrequency>('weekly');
  const [isFamily, setIsFamily] = useState(false);

  const activeUser = familyState.activeUser || familyState.members[0]?.id || '';
  const checkInExp = checkInExpId ? state.experiments.find(e => e.id === checkInExpId) : null;

  const handleCreate = () => {
    if (!title.trim()) return;
    dispatch({
      type: 'CREATE',
      title: title.trim(),
      description: description.trim() || undefined,
      durationDays: duration,
      checkInFrequency: frequency,
      memberId: activeUser,
      isFamily,
    });
    setTitle('');
    setDescription('');
    setDuration(7);
    setView('list');
  };

  if (view === 'create') {
    return (
      <div className="p-4 space-y-5">
        <button onClick={() => setView('list')} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm">
          ← Back
        </button>
        <div className="text-center">
          <span className="text-4xl block mb-2">🧪</span>
          <h1 className="text-xl font-bold text-stone-800">New Experiment</h1>
          <p className="text-stone-500 text-sm">What do you want to try?</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">What are you trying?</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., No phone after 8pm"
            autoFocus
            className="w-full p-3 rounded-xl bg-white border-2 border-stone-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 text-base transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">Why? (optional)</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What are you hoping to learn or change?"
            className="w-full h-20 p-3 rounded-xl bg-white border-2 border-stone-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 resize-none text-sm transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">How long?</label>
          <div className="flex gap-2">
            {[7, 14, 21, 30].map(d => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-3 rounded-xl text-center font-medium transition-all ${
                  duration === d
                    ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-400'
                    : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span className="block text-lg">{d}</span>
                <span className="text-xs">days</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Check-in frequency</label>
          <div className="flex gap-2">
            {[
              { id: 'daily' as const, label: 'Daily', emoji: '📅' },
              { id: 'weekly' as const, label: 'Weekly', emoji: '📆' },
              { id: 'none' as const, label: 'None', emoji: '🤷' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFrequency(f.id)}
                className={`flex-1 py-3 rounded-xl text-center transition-all ${
                  frequency === f.id
                    ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-400'
                    : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span className="block text-lg">{f.emoji}</span>
                <span className="text-xs">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setIsFamily(!isFamily)}
            className={`w-full py-3 rounded-xl text-center transition-all flex items-center justify-center gap-2 ${
              isFamily
                ? 'bg-amber-100 text-amber-800 border-2 border-amber-400'
                : 'bg-white text-stone-600 border-2 border-stone-200 hover:border-stone-300'
            }`}
          >
            <span>{isFamily ? '👨‍👩‍👧‍👦' : '👤'}</span>
            <span className="font-medium">{isFamily ? 'Family experiment (everyone tracks)' : 'Personal experiment'}</span>
          </button>
        </div>

        <Button onClick={handleCreate} disabled={!title.trim()} fullWidth size="lg">
          🧪 Start Experiment
        </Button>
      </div>
    );
  }

  if (view === 'checkin' && checkInExp) {
    return (
      <div className="p-4 space-y-5">
        <button onClick={() => { setView('list'); setCheckInExpId(null); }} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm">
          ← Back
        </button>
        <div className="text-center">
          <span className="text-4xl block mb-2">📝</span>
          <h1 className="text-lg font-bold text-stone-800">Check-in: {checkInExp.title}</h1>
          <p className="text-stone-500 text-sm">How&apos;s it going?</p>
        </div>

        <textarea
          value={checkInNote}
          onChange={e => setCheckInNote(e.target.value)}
          placeholder="Quick reflection... (optional)"
          autoFocus
          className="w-full h-24 p-3 rounded-xl bg-white border-2 border-stone-200 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 resize-none text-sm transition-all"
        />

        <div className="flex gap-2">
          <Button
            onClick={() => {
              dispatch({ type: 'CHECK_IN', experimentId: checkInExp.id, note: checkInNote || undefined, status: 'going' });
              setView('list'); setCheckInExpId(null); setCheckInNote('');
            }}
            variant="success"
            fullWidth
          >
            Still going!
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: 'CHECK_IN', experimentId: checkInExp.id, note: checkInNote || undefined, status: 'struggling' });
              setView('list'); setCheckInExpId(null); setCheckInNote('');
            }}
            variant="secondary"
          >
            Struggling
          </Button>
        </div>
      </div>
    );
  }

  // List view
  const shownExperiments = tab === 'active' ? activeExperiments : completedExperiments;

  return (
    <div className="p-4 space-y-4">
      <button onClick={() => navigateTo('my-board', 'right')} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm">
        ← Back
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-800">🧪 Experiments</h1>
          <p className="text-stone-500 text-sm">Personal growth challenges</p>
        </div>
        <Button onClick={() => setView('create')} variant="primary" size="sm">
          + New
        </Button>
      </div>

      <TabFilter
        options={[
          { id: 'active', label: 'Active', count: activeExperiments.length },
          { id: 'completed', label: 'Completed', count: completedExperiments.length },
        ]}
        selected={tab}
        onSelect={setTab}
        variant="purple"
      />

      {shownExperiments.length === 0 ? (
        <EmptyState
          emoji={tab === 'active' ? '🧪' : '✅'}
          title={tab === 'active' ? 'No active experiments' : 'No completed experiments yet'}
          description={tab === 'active' ? 'Start a new experiment to challenge yourself.' : undefined}
          action={
            tab === 'active' ? (
              <Button onClick={() => setView('create')} variant="primary" size="sm">
                Start One
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {shownExperiments.map(exp => (
            <ExperimentCard
              key={exp.id}
              experiment={exp}
              getMember={getMember}
              currentUserId={activeUser}
              onCheckIn={() => { setCheckInExpId(exp.id); setView('checkin'); }}
              onPause={() => dispatch({ type: 'PAUSE', experimentId: exp.id })}
              onResume={() => dispatch({ type: 'RESUME', experimentId: exp.id })}
              onComplete={() => dispatch({ type: 'COMPLETE', experimentId: exp.id })}
              onReact={(emoji) => dispatch({ type: 'ADD_REACTION', experimentId: exp.id, reaction: { memberId: activeUser, emoji } })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
