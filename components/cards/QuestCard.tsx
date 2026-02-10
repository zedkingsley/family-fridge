'use client';

import { FamilyQuest, FamilyMember } from '@/lib/types';
import Badge from '@/components/ui/Badge';

interface QuestCardProps {
  familyQuest: FamilyQuest;
  getMember?: (id: string) => FamilyMember | undefined;
  onToggleFavorite?: () => void;
  onSelect?: () => void;
  compact?: boolean;
}

export default function QuestCard({ familyQuest, getMember: _getMember, onToggleFavorite, onSelect, compact = false }: QuestCardProps) {
  const { quest, status, completions } = familyQuest;
  const isFavorite = status === 'favorite';
  const isCompleted = completions.length > 0;

  if (compact) {
    return (
      <button
        onClick={onSelect}
        className="w-full text-left bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all group border border-stone-50"
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-stone-800 group-hover:text-amber-900 transition-colors">{quest.title}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
              {quest.duration && <span>⏱ {quest.duration}</span>}
              {quest.minAge > 0 && <span>Ages {quest.minAge}+</span>}
            </div>
          </div>
          {isFavorite && <span className="text-amber-400">★</span>}
          {isCompleted && <Badge label={`${completions.length}x`} icon="✓" variant="completed" size="sm" />}
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-50 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-stone-800 text-lg">{quest.title}</h3>
        {onToggleFavorite && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className={`text-xl transition-all active:scale-125 ${isFavorite ? 'text-amber-400' : 'text-stone-200 hover:text-amber-300'}`}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        )}
      </div>
      <p className="text-stone-600 text-sm leading-relaxed mb-3">{quest.description}</p>
      <div className="flex items-center gap-3 text-xs text-stone-400 flex-wrap">
        {quest.duration && (
          <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-full">⏱ {quest.duration}</span>
        )}
        {quest.minAge > 0 && (
          <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-full">Ages {quest.minAge}+</span>
        )}
        {quest.materials && quest.materials.length > 0 && (
          <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-full">🧰 {quest.materials.length} items needed</span>
        )}
        {isCompleted && (
          <Badge label={`Done ${completions.length}x`} icon="✓" variant="completed" size="sm" />
        )}
      </div>
      {quest.materials && quest.materials.length > 0 && (
        <div className="mt-3 pt-3 border-t border-stone-50">
          <p className="text-xs text-stone-400 mb-1">Materials needed:</p>
          <p className="text-xs text-stone-500">{quest.materials.join(', ')}</p>
        </div>
      )}
      {onSelect && (
        <button
          onClick={onSelect}
          className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:shadow-md transition-all active:scale-[0.98]"
        >
          Pick This Quest
        </button>
      )}
    </div>
  );
}
