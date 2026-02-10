'use client';

import { useState } from 'react';
import { useFamily } from '@/components/providers/FamilyContext';
import { useNavigation } from '@/components/providers/AppProvider';
import Button from '@/components/ui/Button';

const SUGGESTED_VALUES = [
  { emoji: '💪', title: 'Courage', description: 'We face hard things together' },
  { emoji: '😂', title: 'Laughter', description: 'We find the funny in everything' },
  { emoji: '🤝', title: 'Kindness', description: 'We treat everyone with care' },
  { emoji: '📚', title: 'Curiosity', description: 'We never stop learning' },
  { emoji: '🎨', title: 'Creativity', description: 'We make things and take risks' },
  { emoji: '🙏', title: 'Gratitude', description: 'We appreciate what we have' },
  { emoji: '🌱', title: 'Growth', description: 'We always try to get better' },
  { emoji: '❤️', title: 'Love', description: 'We lead with love' },
  { emoji: '🤲', title: 'Generosity', description: 'We share what we have' },
  { emoji: '🪞', title: 'Honesty', description: 'We tell the truth, even when hard' },
  { emoji: '🏔️', title: 'Adventure', description: 'We say yes to new experiences' },
  { emoji: '🧘', title: 'Patience', description: 'We take things one step at a time' },
];

export default function FamilyValuesScreen() {
  const { state, dispatch } = useFamily();
  const { navigateTo } = useNavigation();
  const [showAdd, setShowAdd] = useState(false);
  const [customEmoji, setCustomEmoji] = useState('✨');
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');

  const existingTitles = state.values.map(v => v.title);

  const handleAddSuggested = (v: typeof SUGGESTED_VALUES[0]) => {
    if (state.values.length >= 5) return;
    dispatch({ type: 'ADD_VALUE', value: v });
  };

  const handleAddCustom = () => {
    if (!customTitle.trim() || state.values.length >= 5) return;
    dispatch({
      type: 'ADD_VALUE',
      value: { emoji: customEmoji, title: customTitle.trim(), description: customDesc.trim() },
    });
    setCustomEmoji('✨');
    setCustomTitle('');
    setCustomDesc('');
    setShowAdd(false);
  };

  return (
    <div className="p-4 space-y-5">
      <button onClick={() => navigateTo('family', 'right')} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm">
        ← Back
      </button>

      <div className="text-center">
        <span className="text-4xl block mb-2">🪞</span>
        <h1 className="text-xl font-bold text-stone-800">Family Values</h1>
        <p className="text-stone-500 text-sm">What does your family believe in? (up to 5)</p>
      </div>

      {/* Current values */}
      {state.values.length > 0 && (
        <div className="space-y-2">
          {state.values.map(value => (
            <div
              key={value.id}
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100 flex items-center gap-3"
            >
              <span className="text-2xl">{value.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-stone-800">{value.title}</p>
                <p className="text-stone-500 text-sm">{value.description}</p>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_VALUE', valueId: value.id })}
                className="text-stone-300 hover:text-red-400 transition-colors text-lg"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {state.values.length < 5 && (
        <>
          {/* Suggested values */}
          <div>
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              {state.values.length === 0 ? 'Pick what matters to your family' : 'Add more'}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTED_VALUES.filter(v => !existingTitles.includes(v.title)).map(value => (
                <button
                  key={value.title}
                  onClick={() => handleAddSuggested(value)}
                  className="bg-white rounded-xl p-3 border border-stone-100 text-left hover:border-amber-200 hover:bg-amber-50/30 transition-all group"
                >
                  <span className="text-xl block mb-1">{value.emoji}</span>
                  <p className="font-medium text-stone-800 text-sm">{value.title}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{value.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom value */}
          {showAdd ? (
            <div className="bg-white rounded-xl p-4 border border-stone-200 space-y-3 animate-float-in">
              <h3 className="font-semibold text-stone-800">Create your own</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customEmoji}
                  onChange={e => setCustomEmoji(e.target.value)}
                  className="w-14 text-center p-2 rounded-lg bg-stone-50 border border-stone-200 text-xl"
                  maxLength={2}
                />
                <input
                  type="text"
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  placeholder="Value name"
                  className="flex-1 p-2 rounded-lg bg-stone-50 border border-stone-200 focus:border-amber-400 focus:outline-none text-sm"
                />
              </div>
              <input
                type="text"
                value={customDesc}
                onChange={e => setCustomDesc(e.target.value)}
                placeholder="Short description"
                className="w-full p-2 rounded-lg bg-stone-50 border border-stone-200 focus:border-amber-400 focus:outline-none text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddCustom} disabled={!customTitle.trim()} size="sm">Add</Button>
                <Button onClick={() => setShowAdd(false)} variant="ghost" size="sm">Cancel</Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAdd(true)}
              className="w-full py-3 rounded-xl border-2 border-dashed border-stone-200 text-stone-400 text-sm font-medium hover:border-amber-300 hover:text-amber-600 transition-all"
            >
              + Create your own value
            </button>
          )}
        </>
      )}
    </div>
  );
}
