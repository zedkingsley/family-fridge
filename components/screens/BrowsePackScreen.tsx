'use client';

import { useState } from 'react';
import { useNavigation } from '@/components/providers/AppProvider';
import { useFridge } from '@/components/providers/FridgeContext';
import { useQuests } from '@/components/providers/QuestContext';
import { useFamily } from '@/components/providers/FamilyContext';

export default function BrowsePackScreen() {
  const { activePack, navigateTo, setBrowseMode } = useNavigation();
  const { dispatch: fridgeDispatch, state: fridgeState } = useFridge();
  const { dispatch: questDispatch } = useQuests();
  const { state: familyState } = useFamily();
  const [search, setSearch] = useState('');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  if (!activePack) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <span className="text-5xl mb-4">🃏</span>
        <p className="text-stone-500">No pack selected</p>
      </div>
    );
  }

  const activeUser = familyState.activeUser || familyState.members[0]?.id || '';
  const addedContents = fridgeState.items.map(i => i.content);

  const filteredItems = activePack.items.filter(item => {
    if (!search.trim()) return true;
    const text = (item.text || item.title || item.description || '').toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const handleAdd = (item: typeof activePack.items[0]) => {
    setAddedIds(prev => new Set(Array.from(prev).concat(item.id)));

    if (activePack.type === 'wisdom') {
      fridgeDispatch({
        type: 'ADD_ITEM',
        item: {
          type: 'wisdom',
          content: item.text || '',
          source: item.source || item.attribution || activePack.name,
          capturedBy: activeUser,
          status: 'personal',
        },
      });
    } else {
      questDispatch({
        type: 'ADD_TO_LIBRARY',
        quest: {
          id: item.id,
          title: item.title || '',
          description: item.description || '',
          duration: item.duration || '',
          minAge: item.minAge || 3,
        },
        packId: activePack.id,
        addedBy: activeUser,
      });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('discover', 'right')}
          className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm"
        >
          ← Back
        </button>
        <button
          onClick={() => { setBrowseMode(false); navigateTo('swipe-pack'); }}
          className="text-xs text-stone-400 hover:text-stone-600 transition-colors flex items-center gap-1"
        >
          Swipe mode 🃏
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl">{activePack.emoji}</span>
        <div>
          <h1 className="font-bold text-stone-800">{activePack.name}</h1>
          <p className="text-xs text-stone-400">{activePack.items.length} {activePack.type === 'quest' ? 'quests' : 'cards'}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-sm transition-all"
        />
      </div>

      {/* Grid of items */}
      <div className="space-y-2">
        {filteredItems.map(item => {
          const displayText = activePack.type === 'quest' ? item.title : item.text;
          const isAdded = addedIds.has(item.id) || addedContents.includes(item.text || '');

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-4 shadow-sm transition-all ${
                isAdded ? 'opacity-60' : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-stone-800 leading-snug font-medium">
                    {activePack.type === 'wisdom' ? `"${displayText}"` : displayText}
                  </p>
                  {activePack.type === 'quest' && item.description && (
                    <p className="text-stone-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-xs text-stone-400">
                    {item.source && <span>— {item.source}</span>}
                    {item.attribution && <span>— {item.attribution}</span>}
                    {item.duration && <span>⏱ {item.duration}</span>}
                    {item.minAge && <span>Ages {item.minAge}+</span>}
                  </div>
                </div>
                <button
                  onClick={() => !isAdded && handleAdd(item)}
                  disabled={isAdded}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isAdded
                      ? 'bg-green-50 text-green-600'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200 active:scale-95'
                  }`}
                >
                  {isAdded ? '✓' : '+'}
                </button>
              </div>
            </div>
          );
        })}
        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-stone-400">
            No items match your search
          </div>
        )}
      </div>
    </div>
  );
}
