'use client';

import { useState } from 'react';
import { useFamily } from '@/components/providers/FamilyContext';
import { useFridge } from '@/components/providers/FridgeContext';
import { useNavigation } from '@/components/providers/AppProvider';
import MemberPicker from '@/components/ui/MemberPicker';
import Button from '@/components/ui/Button';
import { VibeEmoji } from '@/lib/types';

const VIBES: { emoji: VibeEmoji; label: string }[] = [
  { emoji: '😂', label: 'Funny' },
  { emoji: '🥹', label: 'Sweet' },
  { emoji: '🤔', label: 'Deep' },
  { emoji: '💡', label: 'Smart' },
  { emoji: '❤️', label: 'Love' },
];

export default function AddQuoteScreen() {
  const { state: familyState } = useFamily();
  const { addQuote } = useFridge();
  const { goBack } = useNavigation();

  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [vibe, setVibe] = useState<VibeEmoji | null>(null);

  const canSave = text.trim().length > 0 && selectedMember !== null && vibe !== null;

  const handleSave = () => {
    if (!canSave || !selectedMember || !vibe) return;
    addQuote(
      text.trim(),
      selectedMember,
      familyState.activeUser || selectedMember,
      vibe
    );
    goBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-orange-50/40">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-amber-100">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <span className="text-xl">&larr;</span>
        </button>
        <h1 className="text-lg font-bold text-stone-800">Add a Quote</h1>
      </div>

      <div className="p-5 space-y-6">
        {/* Big quote icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shadow-sm">
            <span className="text-4xl">&ldquo;</span>
          </div>
        </div>

        {/* Who said it? */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-3">
            Who said it?
          </label>
          <MemberPicker
            members={familyState.members}
            selected={selectedMember}
            onSelect={setSelectedMember}
          />
        </div>

        {/* What did they say? */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-2">
            What did they say?
          </label>
          <textarea
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type the quote here..."
            rows={3}
            className="w-full bg-white border-2 border-stone-200 rounded-xl p-4 text-stone-800 placeholder:text-stone-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none resize-none text-lg transition-colors"
          />
        </div>

        {/* Vibe? */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-3">
            Vibe?
          </label>
          <div className="flex gap-2">
            {VIBES.map(v => (
              <button
                key={v.emoji}
                onClick={() => setVibe(v.emoji)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                  vibe === v.emoji
                    ? 'bg-amber-100 ring-2 ring-amber-400 scale-105 shadow-sm'
                    : 'bg-white border border-stone-100 hover:bg-stone-50'
                }`}
              >
                <span className="text-2xl">{v.emoji}</span>
                <span className={`text-xs font-medium ${
                  vibe === v.emoji ? 'text-amber-800' : 'text-stone-400'
                }`}>
                  {v.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <Button
          onClick={handleSave}
          disabled={!canSave}
          fullWidth
          size="lg"
        >
          Save Quote
        </Button>
      </div>
    </div>
  );
}
