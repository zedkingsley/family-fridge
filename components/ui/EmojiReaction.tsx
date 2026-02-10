'use client';

import { useState } from 'react';
import { Reaction } from '@/lib/types';

const REACTION_OPTIONS = ['❤️', '😂', '🥹', '💪', '✨', '🙌'];

interface EmojiReactionProps {
  reactions: Reaction[];
  currentUserId: string;
  onReact: (emoji: string) => void;
  onRemove: () => void;
}

export default function EmojiReaction({ reactions, currentUserId, onReact, onRemove }: EmojiReactionProps) {
  const [showPicker, setShowPicker] = useState(false);
  const myReaction = reactions.find(r => r.memberId === currentUserId);

  return (
    <div className="relative flex items-center gap-1.5">
      {/* Existing reactions */}
      {reactions.length > 0 && (
        <div className="flex -space-x-1">
          {reactions.map((r, i) => (
            <span key={i} className="text-sm" title={r.memberId}>{r.emoji}</span>
          ))}
        </div>
      )}

      {/* Add/change reaction button */}
      <button
        onClick={() => {
          if (myReaction) {
            onRemove();
          } else {
            setShowPicker(!showPicker);
          }
        }}
        className={`text-xs px-1.5 py-0.5 rounded-full transition-all ${
          myReaction
            ? 'bg-amber-100 text-amber-700'
            : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
        }`}
      >
        {myReaction ? myReaction.emoji : '+'}
      </button>

      {/* Reaction picker */}
      {showPicker && (
        <div className="absolute bottom-full left-0 mb-1 bg-white rounded-full shadow-lg border border-stone-100 flex gap-0.5 p-1 z-10 animate-float-in">
          {REACTION_OPTIONS.map(emoji => (
            <button
              key={emoji}
              onClick={() => { onReact(emoji); setShowPicker(false); }}
              className="w-8 h-8 flex items-center justify-center text-lg rounded-full hover:bg-stone-100 transition-colors active:scale-110"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
