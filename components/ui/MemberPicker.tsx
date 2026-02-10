'use client';

import { FamilyMember } from '@/lib/types';

interface MemberPickerProps {
  members: FamilyMember[];
  selected: string | null;
  onSelect: (memberId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  showNames?: boolean;
}

export default function MemberPicker({ members, selected, onSelect, size = 'md', showNames = true }: MemberPickerProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-16 h-16 text-3xl',
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {members.map(member => (
        <button
          key={member.id}
          onClick={() => onSelect(member.id)}
          className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
            selected === member.id
              ? 'ring-2 shadow-sm scale-105'
              : 'hover:bg-stone-50'
          }`}
          style={{
            backgroundColor: selected === member.id ? `${member.color}15` : undefined,
            ['--tw-ring-color' as string]: selected === member.id ? member.color : undefined,
          } as React.CSSProperties}
        >
          <div
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center`}
            style={{ backgroundColor: `${member.color}20` }}
          >
            {member.avatar}
          </div>
          {showNames && (
            <span className={`font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'} ${
              selected === member.id ? 'text-stone-800' : 'text-stone-500'
            }`}>
              {member.name}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
