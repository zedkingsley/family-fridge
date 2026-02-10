'use client';

import { ReactNode } from 'react';

interface EmptyStateProps {
  emoji: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ emoji, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-6">
      <span className="text-5xl block mb-4">{emoji}</span>
      <h3 className="text-lg font-bold text-stone-700 mb-1">{title}</h3>
      {description && <p className="text-stone-500 text-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}
