'use client';

import { useState, useRef, TouchEvent } from 'react';

interface SwipeCardItem {
  id: string;
  text?: string;
  title?: string;
  description?: string;
  source?: string;
  attribution?: string;
  duration?: string;
  minAge?: number;
}

interface SwipeCardProps {
  item: SwipeCardItem;
  packEmoji: string;
  packColor: string;
  packType: 'wisdom' | 'quest';
  isAlreadyAdded?: boolean;
  onSwipe: (action: 'pass' | 'add') => void;
  onAction: (action: 'pin' | 'rotation') => void;
  remainingCount: number;
  totalCount: number;
  onBack: () => void;
  packName: string;
}

export default function SwipeCard({
  item,
  packEmoji,
  packColor,
  packType,
  isAlreadyAdded,
  onSwipe,
  onAction,
  remainingCount,
  totalCount,
  onBack,
  packName,
}: SwipeCardProps) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showActions, setShowActions] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const progress = ((totalCount - remainingCount) / totalCount) * 100;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 100) {
      handleSwipe(touchDelta > 0 ? 'add' : 'pass');
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  const handleSwipe = (action: 'pass' | 'add') => {
    setSwipeDirection(action === 'add' ? 'right' : 'left');
    setTimeout(() => {
      onSwipe(action);
      setSwipeDirection(null);
    }, 200);
  };

  const displayText = packType === 'quest' ? item.title : item.text;
  const subtitle = packType === 'quest' ? item.description : (item.source || item.attribution);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button onClick={onBack} className="text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1 text-sm">
          <span>←</span> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg">{packEmoji}</span>
          <span className="text-sm font-medium text-stone-600">{packName}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6 px-1">
        <div className="flex justify-between text-xs text-stone-400 mb-1">
          <span>{totalCount - remainingCount} of {totalCount}</span>
          <span>{remainingCount} remaining</span>
        </div>
        <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card stack area */}
      <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
        {/* Current card */}
        <div
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full max-w-sm bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-200 z-20 ${
            swipeDirection === 'left' ? '-translate-x-full rotate-[-20deg] opacity-0' :
            swipeDirection === 'right' ? 'translate-x-full rotate-[20deg] opacity-0' : ''
          }`}
          style={{
            borderColor: packColor,
            transform: touchDelta !== 0
              ? `translateX(${touchDelta}px) rotate(${touchDelta * 0.05}deg)`
              : undefined,
          }}
        >
          {/* Swipe indicators */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-red-100 text-red-600 font-bold text-sm transition-opacity ${
            touchDelta < -50 ? 'opacity-100' : 'opacity-0'
          }`}>
            PASS
          </div>
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-green-100 text-green-600 font-bold text-sm transition-opacity ${
            touchDelta > 50 ? 'opacity-100' : 'opacity-0'
          }`}>
            ADD
          </div>

          {isAlreadyAdded && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              Already added
            </div>
          )}

          <div className="text-center">
            <span className="text-4xl mb-6 block">{packEmoji}</span>
            <p className="text-xl font-medium text-stone-800 leading-relaxed">
              {packType === 'quest' ? displayText : `"${displayText}"`}
            </p>
            {packType === 'quest' && item.description && (
              <p className="text-stone-600 mt-3 text-sm leading-relaxed">{item.description}</p>
            )}
            {subtitle && packType !== 'quest' && (
              <p className="text-stone-500 mt-4 text-sm">— {subtitle}</p>
            )}
            {packType === 'quest' && (
              <div className="flex items-center justify-center gap-3 mt-4 text-xs text-stone-400">
                {item.duration && <span>⏱ {item.duration}</span>}
                {item.minAge && <span>Ages {item.minAge}+</span>}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-stone-400 mt-6">
            Swipe or tap below
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-6 py-6">
        <button
          onClick={() => handleSwipe('pass')}
          className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center text-2xl hover:bg-red-100 hover:text-red-500 hover:scale-110 active:scale-95 transition-all shadow-sm"
        >
          ✕
        </button>
        <button
          onClick={() => setShowActions(true)}
          className="w-12 h-12 rounded-full bg-stone-50 text-stone-400 flex items-center justify-center text-xl hover:bg-stone-100 transition-all shadow-sm self-center"
        >
          ⋯
        </button>
        <button
          onClick={() => handleSwipe('add')}
          className="w-16 h-16 rounded-full bg-green-50 text-green-400 flex items-center justify-center text-2xl hover:bg-green-100 hover:text-green-500 hover:scale-110 active:scale-95 transition-all shadow-sm"
        >
          ♥
        </button>
      </div>

      {/* Action sheet */}
      {showActions && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center" onClick={() => setShowActions(false)}>
          <div className="bg-white w-full max-w-md rounded-t-2xl p-4 space-y-2 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto mb-2" />
            <p className="text-center text-stone-500 text-sm mb-2">Add to...</p>
            <button
              onClick={() => { onAction('pin'); setShowActions(false); }}
              className="w-full py-4 rounded-xl bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition-colors"
            >
              📌 Pin to Fridge
            </button>
            <button
              onClick={() => { onAction('rotation'); setShowActions(false); }}
              className="w-full py-4 rounded-xl bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 transition-colors"
            >
              🔄 Add to Rotation
            </button>
            <button
              onClick={() => setShowActions(false)}
              className="w-full py-4 rounded-xl bg-stone-100 text-stone-600 font-semibold hover:bg-stone-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
