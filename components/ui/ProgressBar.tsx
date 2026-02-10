'use client';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  label?: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export default function ProgressBar({ value, color, label, size = 'sm', showLabel = false }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';
  const gradient = color || 'from-amber-500 to-orange-500';

  return (
    <div>
      {(showLabel || label) && (
        <div className="flex justify-between text-xs text-stone-400 mb-1">
          {label && <span>{label}</span>}
          {showLabel && <span>{Math.round(clampedValue)}%</span>}
        </div>
      )}
      <div className={`${height} bg-stone-100 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
