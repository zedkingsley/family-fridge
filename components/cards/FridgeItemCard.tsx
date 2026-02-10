'use client';

import { useState } from 'react';
import { FridgeItem, FamilyMember, FridgeStatus } from '@/lib/types';
import { PILLAR_CONFIG } from '@/lib/magnets';
import EmojiReaction from '@/components/ui/EmojiReaction';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

interface FridgeItemCardProps {
  item: FridgeItem;
  getMember: (id: string) => FamilyMember | undefined;
  currentUserId: string;
  onPromote?: (id: string, status: FridgeStatus) => void;
  onReact?: (itemId: string, emoji: string) => void;
  onRemoveReaction?: (itemId: string) => void;
  compact?: boolean;
  showActions?: boolean;
}

export default function FridgeItemCard({
  item,
  getMember,
  currentUserId,
  onPromote,
  onReact,
  onRemoveReaction,
  compact = false,
  showActions = false,
}: FridgeItemCardProps) {
  const [showModal, setShowModal] = useState(false);
  const member = item.saidBy ? getMember(item.saidBy) : getMember(item.capturedBy);
  const pillarConfig = item.pillar ? (PILLAR_CONFIG as Record<string, { emoji: string; name: string; color: string }>)[item.pillar] : null;

  const statusConfig: Record<FridgeStatus, { icon: string; label: string; variant: 'pinned' | 'rotation' | 'personal' | 'archived' }> = {
    pinned: { icon: '📌', label: 'Pinned', variant: 'pinned' },
    rotation: { icon: '🔄', label: 'Rotation', variant: 'rotation' },
    personal: { icon: '📋', label: 'Personal', variant: 'personal' },
    archived: { icon: '📦', label: 'Archived', variant: 'archived' },
  };

  if (compact) {
    return (
      <div
        className="bg-white rounded-xl p-3 shadow-sm border-l-4 hover:shadow-md transition-shadow cursor-pointer"
        style={{ borderLeftColor: member?.color || '#d4d4d4' }}
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-start gap-1">
          {item.emoji && <span className="text-base">{item.emoji}</span>}
          {pillarConfig && !item.emoji && <span className="text-base">{pillarConfig.emoji}</span>}
        </div>
        <p className="text-stone-800 text-sm line-clamp-2 mt-1 leading-snug">
          {item.type === 'quote' ? `"${item.content}"` : item.content}
        </p>
        <p className="text-xs text-stone-400 mt-1.5">
          {item.saidBy ? `— ${getMember(item.saidBy)?.name}` : item.source || ''}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="bg-white rounded-xl p-4 shadow-sm border-l-4 hover:shadow-md transition-all cursor-pointer"
        style={{ borderLeftColor: member?.color || '#d4d4d4' }}
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl shrink-0">
            {item.emoji || pillarConfig?.emoji || '✨'}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-stone-800 leading-snug">
              {item.type === 'quote' ? `"${item.content}"` : item.content}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-stone-400 flex-wrap">
              {item.saidBy && (
                <span className="flex items-center gap-1">
                  {getMember(item.saidBy)?.avatar} {getMember(item.saidBy)?.name}
                </span>
              )}
              {item.source && !item.saidBy && <span>— {item.source}</span>}
              {showActions && (
                <Badge
                  label={statusConfig[item.status].label}
                  icon={statusConfig[item.status].icon}
                  variant={statusConfig[item.status].variant}
                  size="sm"
                />
              )}
            </div>
            {/* Reactions */}
            {(item.reactions.length > 0 || onReact) && (
              <div className="mt-2">
                <EmojiReaction
                  reactions={item.reactions}
                  currentUserId={currentUserId}
                  onReact={(emoji) => onReact?.(item.id, emoji)}
                  onRemove={() => onRemoveReaction?.(item.id)}
                />
              </div>
            )}
          </div>
          <span className="text-lg shrink-0">{member?.avatar}</span>
        </div>

        {/* Promotion buttons */}
        {showActions && onPromote && item.status !== 'pinned' && (
          <div className="flex gap-2 mt-3">
            {item.status !== 'rotation' && (
              <button
                onClick={(e) => { e.stopPropagation(); onPromote(item.id, 'rotation'); }}
                className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                🔄 Rotation
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onPromote(item.id, 'pinned'); }}
              className="flex-1 py-2 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              📌 Pin
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center mb-4">
          <span className="text-4xl block mb-3">{item.emoji || pillarConfig?.emoji || '✨'}</span>
          <p className="text-xl text-stone-800 font-medium leading-relaxed">
            {item.type === 'quote' ? `"${item.content}"` : item.content}
          </p>
          <p className="text-stone-500 mt-2">
            {item.saidBy ? `— ${getMember(item.saidBy)?.name}` : item.source || ''}
          </p>
        </div>
        {onPromote && (
          <div className="space-y-2">
            {item.status !== 'pinned' && (
              <button
                onClick={() => { onPromote(item.id, 'pinned'); setShowModal(false); }}
                className="w-full py-3 rounded-xl bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition-colors"
              >
                📌 Pin to Fridge
              </button>
            )}
            {item.status !== 'rotation' && item.status !== 'pinned' && (
              <button
                onClick={() => { onPromote(item.id, 'rotation'); setShowModal(false); }}
                className="w-full py-3 rounded-xl bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 transition-colors"
              >
                🔄 Add to Rotation
              </button>
            )}
            {item.status !== 'archived' && item.status !== 'personal' && (
              <button
                onClick={() => { onPromote(item.id, 'archived'); setShowModal(false); }}
                className="w-full py-3 rounded-xl bg-stone-100 text-stone-600 font-semibold hover:bg-stone-200 transition-colors"
              >
                📦 Archive
              </button>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
