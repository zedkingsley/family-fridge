'use client';

import { Experiment, FamilyMember } from '@/lib/types';
import { daysSince } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import EmojiReaction from '@/components/ui/EmojiReaction';

interface ExperimentCardProps {
  experiment: Experiment;
  getMember?: (id: string) => FamilyMember | undefined;
  currentUserId: string;
  onCheckIn?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onComplete?: () => void;
  onReact?: (emoji: string) => void;
  onRemoveReaction?: () => void;
  compact?: boolean;
}

export default function ExperimentCard({
  experiment,
  getMember,
  currentUserId,
  onCheckIn,
  onPause,
  onResume,
  onComplete,
  onReact,
  onRemoveReaction,
  compact = false,
}: ExperimentCardProps) {
  const daysIn = daysSince(experiment.startDate);
  const progress = Math.min(100, (daysIn / experiment.durationDays) * 100);
  const isOwner = experiment.memberId === currentUserId;
  const member = getMember?.(experiment.memberId);
  const isOverdue = daysIn >= experiment.durationDays && experiment.status === 'active';

  const statusConfig = {
    active: { label: 'Active', variant: 'active' as const, emoji: '🧪' },
    completed: { label: 'Completed', variant: 'completed' as const, emoji: '✅' },
    paused: { label: 'Paused', variant: 'default' as const, emoji: '⏸' },
    abandoned: { label: 'Stopped', variant: 'archived' as const, emoji: '🛑' },
  };

  const config = statusConfig[experiment.status];

  if (compact) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-50">
        <div className="flex items-center gap-3">
          <span className="text-xl">{config.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-stone-800 text-sm truncate">{experiment.title}</p>
            <p className="text-xs text-stone-400">
              {experiment.status === 'active' ? `Day ${daysIn + 1} of ${experiment.durationDays}` : config.label}
            </p>
          </div>
          {member && <span className="text-lg">{member.avatar}</span>}
        </div>
        {experiment.status === 'active' && (
          <div className="mt-2">
            <ProgressBar value={progress} color={isOverdue ? 'from-amber-500 to-red-500' : 'from-emerald-500 to-green-500'} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{config.emoji}</span>
          <Badge label={config.label} variant={config.variant} />
        </div>
        {member && (
          <span className="text-sm text-stone-400 flex items-center gap-1">
            {member.avatar} {member.name}
          </span>
        )}
      </div>

      <h3 className="font-bold text-stone-800 text-lg mb-1">{experiment.title}</h3>
      {experiment.description && (
        <p className="text-stone-500 text-sm mb-3">{experiment.description}</p>
      )}

      {experiment.status === 'active' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-stone-500">Day {daysIn + 1} of {experiment.durationDays}</span>
            <span className="text-stone-400">{Math.round(progress)}%</span>
          </div>
          <ProgressBar
            value={progress}
            size="md"
            color={isOverdue ? 'from-amber-500 to-red-500' : 'from-emerald-500 to-green-500'}
          />
          {isOverdue && (
            <p className="text-xs text-amber-600 mt-1">Ready to complete! You made it!</p>
          )}
        </div>
      )}

      {experiment.reflection && (
        <div className="bg-stone-50 rounded-xl p-3 mb-3">
          <p className="text-xs text-stone-400 mb-1">Reflection</p>
          <p className="text-sm text-stone-600 italic">&ldquo;{experiment.reflection}&rdquo;</p>
        </div>
      )}

      {/* Reactions */}
      {(experiment.reactions.length > 0 || onReact) && (
        <div className="mb-3">
          <EmojiReaction
            reactions={experiment.reactions}
            currentUserId={currentUserId}
            onReact={(emoji) => onReact?.(emoji)}
            onRemove={() => onRemoveReaction?.()}
          />
        </div>
      )}

      {/* Actions */}
      {isOwner && experiment.status === 'active' && (
        <div className="flex gap-2">
          {onCheckIn && (
            <button
              onClick={onCheckIn}
              className="flex-1 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm hover:bg-emerald-100 transition-colors"
            >
              Check In
            </button>
          )}
          {isOverdue && onComplete && (
            <button
              onClick={onComplete}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:shadow-md transition-all"
            >
              Complete!
            </button>
          )}
          {!isOverdue && onPause && (
            <button
              onClick={onPause}
              className="py-2.5 px-4 rounded-xl bg-stone-50 text-stone-500 text-sm hover:bg-stone-100 transition-colors"
            >
              Pause
            </button>
          )}
        </div>
      )}
      {isOwner && experiment.status === 'paused' && onResume && (
        <button
          onClick={onResume}
          className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm hover:bg-emerald-100 transition-colors"
        >
          Resume
        </button>
      )}
    </div>
  );
}
