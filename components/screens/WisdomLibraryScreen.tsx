'use client';

import { useState, useMemo, useCallback } from 'react';
import { useFridge } from '@/components/providers/FridgeContext';
import { useFamily } from '@/components/providers/FamilyContext';
import { useNavigation } from '@/components/providers/AppProvider';
import { MAGNETS, PILLAR_CONFIG, Pillar } from '@/lib/magnets';
import TabFilter from '@/components/ui/TabFilter';

export default function WisdomLibraryScreen() {
  const { state: fridgeState, addWisdom } = useFridge();
  const { state: familyState } = useFamily();
  const { navigateTo } = useNavigation();

  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [flashId, setFlashId] = useState<number | null>(null);

  // Set of already-added magnet content for quick lookup
  const addedContents = useMemo(() => {
    return new Set(
      fridgeState.items
        .filter(item => item.type === 'wisdom')
        .map(item => item.content)
    );
  }, [fridgeState.items]);

  // Pillar filter tabs
  const pillarTabs = useMemo(() => {
    const allOption = { id: 'all', label: 'All', emoji: '🌟', count: MAGNETS.length };
    const pillars = (Object.keys(PILLAR_CONFIG) as Pillar[]).map(p => ({
      id: p,
      label: PILLAR_CONFIG[p].label,
      emoji: PILLAR_CONFIG[p].emoji,
      count: MAGNETS.filter(m => m.pillar === p).length,
    }));
    return [allOption, ...pillars];
  }, []);

  // Filtered magnets
  const filteredMagnets = useMemo(() => {
    if (selectedPillar === 'all') return MAGNETS;
    return MAGNETS.filter(m => m.pillar === selectedPillar);
  }, [selectedPillar]);

  const handleAdd = useCallback((magnet: typeof MAGNETS[0]) => {
    if (addedContents.has(magnet.text)) return;
    addWisdom(
      magnet.text,
      magnet.source,
      familyState.activeUser || '',
      magnet.pillar
    );
    // Trigger green flash
    setFlashId(magnet.id);
    setTimeout(() => setFlashId(null), 800);
  }, [addedContents, addWisdom, familyState.activeUser]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-orange-50/40">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-amber-100">
        <button
          onClick={() => navigateTo('discover')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <span className="text-xl">&larr;</span>
        </button>
        <div>
          <h1 className="text-lg font-bold text-stone-800">Wisdom Library</h1>
          <p className="text-xs text-stone-500">60 philosophy magnets</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Pillar filter tabs */}
        <TabFilter
          options={pillarTabs}
          selected={selectedPillar}
          onSelect={setSelectedPillar}
          variant="amber"
        />

        {/* Magnets list */}
        <div className="space-y-3">
          {filteredMagnets.map(magnet => {
            const isAdded = addedContents.has(magnet.text);
            const isFlashing = flashId === magnet.id;
            const pillar = PILLAR_CONFIG[magnet.pillar];

            return (
              <div
                key={magnet.id}
                className={`bg-white rounded-xl p-4 border transition-all duration-300 ${
                  isFlashing
                    ? 'border-emerald-300 bg-emerald-50 shadow-md shadow-emerald-100'
                    : 'border-stone-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Pillar emoji */}
                  <span className="text-lg mt-0.5 shrink-0">{pillar.emoji}</span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-800 italic leading-relaxed text-sm">
                      &ldquo;{magnet.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-stone-400">
                        &mdash; {magnet.source}
                      </p>
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${pillar.color}15`,
                          color: pillar.color,
                        }}
                      >
                        {pillar.label}
                      </span>
                    </div>
                  </div>

                  {/* Add button */}
                  <button
                    onClick={() => handleAdd(magnet)}
                    disabled={isAdded}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isAdded
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : isFlashing
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200 active:scale-95'
                    }`}
                  >
                    {isAdded ? 'Added' : isFlashing ? 'Added!' : 'Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
