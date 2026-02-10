'use client';

import { useState, useMemo } from 'react';
import { useFamily } from '@/components/providers/FamilyContext';
import { useRituals } from '@/components/providers/RitualContext';
import { useNavigation } from '@/components/providers/AppProvider';
import MemberPicker from '@/components/ui/MemberPicker';
import Button from '@/components/ui/Button';
import SpotlightPassCard from '@/components/cards/SpotlightPassCard';

export default function PassSpotlightScreen() {
  const { state: familyState, getMember } = useFamily();
  const { state: ritualState, dispatch, spotlightDaysHeld } = useRituals();
  const { navigateTo, goBack } = useNavigation();

  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const currentHolder = getMember(ritualState.spotlight.currentHolder);

  // Exclude the current spotlight holder from the picker
  const eligibleMembers = useMemo(() => {
    return familyState.members.filter(
      m => m.id !== ritualState.spotlight.currentHolder
    );
  }, [familyState.members, ritualState.spotlight.currentHolder]);

  const canPass = selectedMember !== null && reason.trim().length > 0;

  const handlePass = () => {
    if (!canPass || !selectedMember) return;
    dispatch({
      type: 'PASS_SPOTLIGHT',
      from: ritualState.spotlight.currentHolder,
      to: selectedMember,
      reason: reason.trim(),
    });
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-yellow-50/40">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-amber-100">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <span className="text-xl">&larr;</span>
        </button>
        <h1 className="text-lg font-bold text-stone-800">Pass the Spotlight</h1>
      </div>

      <div className="p-5 space-y-6">
        {/* Current holder with star */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="relative">
            <span className="text-5xl">⭐</span>
            {currentHolder && (
              <div
                className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-md"
                style={{ backgroundColor: `${currentHolder.color}25` }}
              >
                {currentHolder.avatar}
              </div>
            )}
          </div>
          <div className="text-center mt-2">
            <p className="text-lg font-bold text-stone-800">
              {currentHolder?.name || 'No one'} has the Spotlight
            </p>
            {spotlightDaysHeld > 0 && (
              <p className="text-sm text-stone-500">
                {spotlightDaysHeld} day{spotlightDaysHeld !== 1 ? 's' : ''} and counting
              </p>
            )}
          </div>
        </div>

        {/* Who deserves it? */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-3">
            Who deserves it?
          </label>
          <MemberPicker
            members={eligibleMembers}
            selected={selectedMember}
            onSelect={setSelectedMember}
          />
        </div>

        {/* Why? */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-2">
            Why?
          </label>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="What did they do that was special?"
            rows={3}
            className="w-full bg-white border-2 border-stone-200 rounded-xl p-4 text-stone-800 placeholder:text-stone-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none resize-none transition-colors"
          />
        </div>

        {/* Pass button */}
        <Button
          onClick={handlePass}
          disabled={!canPass}
          fullWidth
          size="lg"
        >
          Pass the Spotlight ⭐
        </Button>

        {/* Spotlight history */}
        {ritualState.spotlight.history.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Spotlight History
            </h2>
            <div className="space-y-3">
              {ritualState.spotlight.history.map(pass => (
                <SpotlightPassCard
                  key={pass.id}
                  pass={pass}
                  getMember={getMember}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
