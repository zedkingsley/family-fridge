'use client';

interface BadgeProps {
  label: string;
  icon?: string;
  variant?: 'pinned' | 'rotation' | 'personal' | 'archived' | 'active' | 'completed' | 'default';
  size?: 'sm' | 'md';
}

const variants = {
  pinned: 'bg-amber-100 text-amber-800',
  rotation: 'bg-blue-100 text-blue-800',
  personal: 'bg-stone-100 text-stone-600',
  archived: 'bg-purple-100 text-purple-800',
  active: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-green-100 text-green-800',
  default: 'bg-stone-100 text-stone-600',
};

const sizes = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2 py-0.5',
};

export default function Badge({ label, icon, variant = 'default', size = 'md' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}
