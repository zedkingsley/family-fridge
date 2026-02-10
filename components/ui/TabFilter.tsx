'use client';

interface TabOption {
  id: string;
  label: string;
  emoji?: string;
  count?: number;
}

interface TabFilterProps {
  options: TabOption[];
  selected: string;
  onSelect: (id: string) => void;
  variant?: 'default' | 'amber' | 'purple';
}

const activeVariants = {
  default: 'bg-stone-800 text-white',
  amber: 'bg-amber-100 text-amber-800',
  purple: 'bg-purple-100 text-purple-800',
};

export default function TabFilter({ options, selected, onSelect, variant = 'amber' }: TabFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
            selected === opt.id
              ? activeVariants[variant]
              : 'bg-white text-stone-500 hover:bg-stone-50'
          }`}
        >
          {opt.emoji && <span>{opt.emoji}</span>}
          {opt.label}
          {opt.count !== undefined && <span className="text-xs opacity-70">({opt.count})</span>}
        </button>
      ))}
    </div>
  );
}
