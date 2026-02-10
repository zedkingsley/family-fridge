'use client';

import { SpotlightPass, FamilyMember } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface SpotlightPassCardProps {
  pass: SpotlightPass;
  getMember: (id: string) => FamilyMember | undefined;
}

export default function SpotlightPassCard({ pass, getMember }: SpotlightPassCardProps) {
  const from = getMember(pass.from);
  const to = getMember(pass.to);

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200/50">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg">{from?.avatar}</span>
        <span className="text-amber-400">→</span>
        <span className="text-lg">{to?.avatar}</span>
        <span className="font-medium text-amber-900">{to?.name}</span>
      </div>
      <p className="text-stone-700 text-sm mt-2 italic">&ldquo;{pass.reason}&rdquo;</p>
      <p className="text-xs text-stone-400 mt-2">{formatDate(pass.passedAt)}</p>
    </div>
  );
}
