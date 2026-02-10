'use client';

import { useState } from 'react';
import { useNavigation } from '@/components/providers/AppProvider';
import { useFridge } from '@/components/providers/FridgeContext';
import { useQuests } from '@/components/providers/QuestContext';
import { useFamily } from '@/components/providers/FamilyContext';
import SwipeCard from '@/components/cards/SwipeCard';
import Button from '@/components/ui/Button';

export default function SwipePackScreen() {
  const { activePack, navigateTo, setBrowseMode } = useNavigation();
  const { dispatch: fridgeDispatch, state: fridgeState } = useFridge();
  const { dispatch: questDispatch } = useQuests();
  const { state: familyState } = useFamily();
  const [swipedIds, setSwipedIds] = useState<Set<string>>(new Set());

  if (!activePack) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <span className="text-5xl mb-4">🃏</span>
        <p className="text-stone-500">No pack selected</p>
        <Button onClick={() => navigateTo('discover', 'right')} variant="secondary" className="mt-4">
          Browse Packs
        </Button>
      </div>
    );
  }

  const activeUser = familyState.activeUser || familyState.members[0]?.id || '';
  const remainingItems = activePack.items.filter(item => !swipedIds.has(item.id));
  const currentItem = remainingItems[0];
  const addedContents = fridgeState.items.map(i => i.content);

  const addWisdomItem = (content: string, source: string, status: 'personal' | 'pinned' | 'rotation') => {
    fridgeDispatch({
      type: 'ADD_ITEM',
      item: { type: 'wisdom', content, source, capturedBy: activeUser, status },
    });
  };

  const addQuestItem = () => {
    if (!currentItem) return;
    questDispatch({
      type: 'ADD_TO_LIBRARY',
      quest: {
        id: currentItem.id,
        title: currentItem.title || '',
        description: currentItem.description || '',
        duration: currentItem.duration || '',
        minAge: currentItem.minAge || 3,
      },
      packId: activePack.id,
      addedBy: activeUser,
    });
  };

  const handleSwipe = (action: 'pass' | 'add') => {
    if (!currentItem) return;
    setSwipedIds(prev => new Set(Array.from(prev).concat(currentItem.id)));

    if (action === 'add') {
      if (activePack.type === 'wisdom') {
        addWisdomItem(
          currentItem.text || '',
          currentItem.source || currentItem.attribution || activePack.name,
          'personal'
        );
      } else {
        addQuestItem();
      }
    }
  };

  const handleAction = (action: 'pin' | 'rotation') => {
    if (!currentItem) return;
    setSwipedIds(prev => new Set(Array.from(prev).concat(currentItem.id)));

    if (activePack.type === 'wisdom') {
      addWisdomItem(
        currentItem.text || '',
        currentItem.source || currentItem.attribution || activePack.name,
        action === 'pin' ? 'pinned' : 'rotation'
      );
    } else {
      addQuestItem();
    }
  };

  if (!currentItem) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[70vh]">
        <span className="text-6xl mb-4">✨</span>
        <h2 className="text-xl font-bold text-stone-800">Pack Complete!</h2>
        <p className="text-stone-500 mt-1">
          You reviewed all {activePack.items.length} {activePack.type === 'quest' ? 'quests' : 'cards'}
        </p>
        <div className="flex gap-3 mt-6">
          <Button onClick={() => navigateTo('discover', 'right')}>
            Browse More
          </Button>
          <Button onClick={() => { setBrowseMode(true); navigateTo('browse-pack'); }} variant="secondary">
            Review in Grid
          </Button>
        </div>
      </div>
    );
  }

  const isAlreadyAdded = activePack.type === 'wisdom'
    ? addedContents.includes(currentItem.text || '')
    : false;

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => { setBrowseMode(true); navigateTo('browse-pack'); }}
          className="text-xs text-stone-400 hover:text-stone-600 transition-colors flex items-center gap-1"
        >
          Grid view ▤
        </button>
      </div>

      <SwipeCard
        item={currentItem}
        packEmoji={activePack.emoji}
        packColor={activePack.color}
        packType={activePack.type}
        isAlreadyAdded={isAlreadyAdded}
        onSwipe={handleSwipe}
        onAction={handleAction}
        remainingCount={remainingItems.length}
        totalCount={activePack.items.length}
        onBack={() => navigateTo('discover', 'right')}
        packName={activePack.name}
      />
    </div>
  );
}
