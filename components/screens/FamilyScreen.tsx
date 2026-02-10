'use client';

import { useState } from 'react';
import { useFamily } from '@/components/providers/FamilyContext';
import { useFridge } from '@/components/providers/FridgeContext';
import { useRituals } from '@/components/providers/RitualContext';
import { useExperiments } from '@/components/providers/ExperimentContext';
import { useNavigation } from '@/components/providers/AppProvider';
import SpotlightPassCard from '@/components/cards/SpotlightPassCard';
import { BADGES } from '@/lib/badges';
import { getAge } from '@/lib/utils';

export default function FamilyScreen() {
  const { state: familyState, getMember } = useFamily();
  const { state: fridgeState } = useFridge();
  const { state: ritualState } = useRituals();
  const { memberExperiments } = useExperiments();
  const { navigateTo } = useNavigation();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const memberItems = selectedMember
    ? fridgeState.items.filter(i => i.saidBy === selectedMember || (i.capturedBy === selectedMember && !i.saidBy))
    : [];

  const getMemberStats = (memberId: string) => {
    const quotes = fridgeState.items.filter(i => i.capturedBy === memberId).length;
    const spotlights = ritualState.spotlight.history.filter(s => s.to === memberId).length;
    const experiments = memberExperiments(memberId).filter(e => e.status === 'completed').length;
    return { quotes, spotlights, experiments };
  };

  const getMemberBadges = (memberId: string) => {
    const stats = getMemberStats(memberId);
    return BADGES.filter(badge => {
      switch (badge.category) {
        case 'quotes': return stats.quotes >= badge.requirement;
        case 'spotlight': return stats.spotlights >= badge.requirement;
        case 'experiments': return stats.experiments >= badge.requirement;
        default: return false;
      }
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-stone-800">👨‍👩‍👧‍👦 Family</h1>
        {familyState.values.length > 0 && (
          <button
            onClick={() => navigateTo('family-values')}
            className="text-amber-600 text-sm font-medium hover:text-amber-700"
          >
            Our Values →
          </button>
        )}
      </div>

      {/* Family Values preview */}
      {familyState.values.length > 0 && (
        <button
          onClick={() => navigateTo('family-values')}
          className="w-full bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-100 hover:border-amber-200 transition-all text-left"
        >
          <div className="flex items-center gap-2 flex-wrap">
            {familyState.values.map(v => (
              <span key={v.id} className="bg-white px-2 py-1 rounded-full text-xs font-medium text-stone-700 border border-stone-100">
                {v.emoji} {v.title}
              </span>
            ))}
          </div>
        </button>
      )}

      {/* Member Selector */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {familyState.members.map(member => {
          const stats = getMemberStats(member.id);
          const badges = getMemberBadges(member.id);
          return (
            <button
              key={member.id}
              onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all relative shrink-0 ${
                selectedMember === member.id
                  ? 'bg-amber-100 border-2 shadow-sm'
                  : 'bg-white border-2 border-transparent hover:bg-stone-50'
              }`}
              style={{
                borderColor: selectedMember === member.id ? member.color : undefined,
              }}
            >
              <span className="text-3xl">{member.avatar}</span>
              <span className="text-xs font-medium">{member.name}</span>
              <span className="text-[10px] text-stone-400">{getAge(member.birthdate)} yrs</span>
              {/* Badge indicators */}
              {badges.length > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {badges.slice(0, 3).map(b => (
                    <span key={b.id} className="text-xs" title={b.name}>{b.emoji}</span>
                  ))}
                </div>
              )}
              <span className="absolute -top-1 -right-1 bg-stone-200 text-stone-600 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {stats.quotes}
              </span>
            </button>
          );
        })}
      </div>

      {/* Member detail */}
      {selectedMember && (
        <div className="space-y-4 animate-float-in">
          <h2 className="font-bold text-stone-800">
            {getMember(selectedMember)?.avatar} {getMember(selectedMember)?.name}&apos;s Highlights
          </h2>

          {/* Badges */}
          {getMemberBadges(selectedMember).length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {getMemberBadges(selectedMember).map(badge => (
                <div key={badge.id} className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg px-3 py-2 border border-amber-100">
                  <span className="text-lg mr-1">{badge.emoji}</span>
                  <span className="text-xs font-medium text-amber-800">{badge.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Items */}
          {memberItems.length > 0 ? (
            <div className="space-y-2">
              {memberItems.slice(0, 10).map(item => (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
                  <span className="text-xl shrink-0">{item.emoji || '✨'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-800 leading-snug">
                      {item.type === 'quote' ? `"${item.content}"` : item.content}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-400 text-sm py-4 text-center bg-stone-50 rounded-xl">
              No captures yet
            </p>
          )}
        </div>
      )}

      {/* Spotlight History */}
      <div>
        <h2 className="font-bold text-stone-800 mb-3">⭐ Spotlight History</h2>
        {ritualState.spotlight.history.length === 0 ? (
          <p className="text-stone-400 text-sm py-4 text-center bg-stone-50 rounded-xl">
            No spotlight passes yet
          </p>
        ) : (
          <div className="space-y-2">
            {ritualState.spotlight.history.slice(0, 10).map(pass => (
              <SpotlightPassCard key={pass.id} pass={pass} getMember={getMember} />
            ))}
          </div>
        )}
      </div>

      {/* Family Story link */}
      <button
        onClick={() => navigateTo('family-story')}
        className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 hover:border-indigo-200 transition-all text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <div className="flex-1">
            <p className="font-semibold text-stone-800">Family Story</p>
            <p className="text-stone-500 text-xs">See your family&apos;s timeline</p>
          </div>
          <span className="text-stone-300 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </button>
    </div>
  );
}
