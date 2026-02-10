'use client';

import { useMemo } from 'react';
import { useFridge } from '@/components/providers/FridgeContext';
import { useRituals } from '@/components/providers/RitualContext';
import { useQuests } from '@/components/providers/QuestContext';
import { useExperiments } from '@/components/providers/ExperimentContext';
import { useFamily } from '@/components/providers/FamilyContext';
import { useNavigation } from '@/components/providers/AppProvider';
import { formatDate } from '@/lib/utils';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'quote' | 'wisdom' | 'note' | 'spotlight' | 'quest' | 'experiment' | 'value';
  emoji: string;
  title: string;
  subtitle?: string;
  memberId?: string;
  color?: string;
}

export default function FamilyStoryScreen() {
  const { state: fridgeState } = useFridge();
  const { state: ritualState } = useRituals();
  const { state: questState } = useQuests();
  const { state: expState } = useExperiments();
  const { state: familyState, getMember } = useFamily();
  const { navigateTo } = useNavigation();

  const events = useMemo(() => {
    const all: TimelineEvent[] = [];

    // Fridge items
    fridgeState.items.forEach(item => {
      const member = item.saidBy ? getMember(item.saidBy) : getMember(item.capturedBy);
      all.push({
        id: item.id,
        date: item.createdAt,
        type: item.type as TimelineEvent['type'],
        emoji: item.emoji || '✨',
        title: item.type === 'quote' ? `"${item.content}"` : item.content,
        subtitle: item.saidBy ? `— ${getMember(item.saidBy)?.name}` : item.source,
        memberId: item.saidBy || item.capturedBy,
        color: member?.color,
      });
    });

    // Spotlight passes
    ritualState.spotlight.history.forEach(pass => {
      const to = getMember(pass.to);
      all.push({
        id: pass.id,
        date: pass.passedAt,
        type: 'spotlight',
        emoji: '⭐',
        title: `Spotlight passed to ${to?.name}`,
        subtitle: pass.reason,
        memberId: pass.to,
        color: to?.color,
      });
    });

    // Completed quests
    questState.weeklyHistory
      .filter(wq => wq.status === 'completed')
      .forEach(wq => {
        const fq = questState.library.find(f => f.id === wq.familyQuestId);
        if (!fq) return;
        all.push({
          id: wq.id,
          date: wq.completedAt || wq.weekStart,
          type: 'quest',
          emoji: '🎯',
          title: `Completed: ${fq.quest.title}`,
          subtitle: wq.note,
          memberId: wq.pickedBy,
        });
      });

    // Completed experiments
    expState.experiments
      .filter(e => e.status === 'completed')
      .forEach(exp => {
        const member = getMember(exp.memberId);
        all.push({
          id: exp.id,
          date: exp.completedAt || exp.startDate,
          type: 'experiment',
          emoji: '🧪',
          title: `${member?.name} completed: ${exp.title}`,
          subtitle: exp.reflection,
          memberId: exp.memberId,
          color: member?.color,
        });
      });

    // Family values
    familyState.values.forEach(val => {
      all.push({
        id: val.id,
        date: val.createdAt,
        type: 'value',
        emoji: val.emoji,
        title: `Added family value: ${val.title}`,
        subtitle: val.description,
      });
    });

    return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [fridgeState.items, ritualState.spotlight.history, questState, expState.experiments, familyState.values, getMember]);

  // Group by month
  const grouped = useMemo(() => {
    const groups: Record<string, TimelineEvent[]> = {};
    events.forEach(event => {
      const d = new Date(event.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(event);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [events]);

  return (
    <div className="p-4 space-y-6">
      <button onClick={() => navigateTo('family', 'right')} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm">
        ← Back
      </button>

      <div className="text-center">
        <span className="text-4xl block mb-2">📖</span>
        <h1 className="text-xl font-bold text-stone-800">Family Story</h1>
        <p className="text-stone-500 text-sm">{events.length} moments captured</p>
      </div>

      {grouped.length === 0 ? (
        <div className="text-center py-12 text-stone-400">
          <span className="text-5xl block mb-4">📖</span>
          <p>Your family story starts with the first capture.</p>
        </div>
      ) : (
        grouped.map(([monthKey, monthEvents]) => {
          const d = new Date(monthKey + '-01');
          const monthLabel = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

          return (
            <div key={monthKey}>
              <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wide mb-3 sticky top-14 bg-[#FEF7ED] py-1 z-10">
                {monthLabel}
              </h2>
              <div className="space-y-2 relative">
                {/* Timeline line */}
                <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-stone-100" />

                {monthEvents.map(event => {
                  // member lookup available via getMember(event.memberId) if needed
                  return (
                    <div key={event.id} className="flex gap-3 relative">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0 z-10 border-2 border-white"
                        style={{ backgroundColor: event.color ? `${event.color}20` : '#f5f5f4' }}
                      >
                        {event.emoji}
                      </div>
                      <div className="flex-1 bg-white rounded-xl p-3 shadow-sm min-w-0">
                        <p className="text-stone-800 text-sm leading-snug">{event.title}</p>
                        {event.subtitle && (
                          <p className="text-stone-400 text-xs mt-1 italic line-clamp-2">{event.subtitle}</p>
                        )}
                        <p className="text-[10px] text-stone-300 mt-1">{formatDate(event.date)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
