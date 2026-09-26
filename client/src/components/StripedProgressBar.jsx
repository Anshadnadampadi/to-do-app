import React from 'react';

export const StripedProgressBar = ({
  progress = 0,
  showPercentage = true,
  height = '8px',
  interactive = false,
  onChange,
  className = ''
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const handleClick = (e) => {
    if (!interactive || !onChange) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercentage = Math.round((clickX / rect.width) * 100);
    onChange(Math.min(100, Math.max(0, newPercentage)));
  };

  return (
    <div className={`w-full flex items-center gap-3 ${className}`}>
      <div
        onClick={handleClick}
        className={`relative flex-1 bg-black/60 rounded-full overflow-hidden border border-white/10 ${
          interactive ? 'cursor-pointer hover:border-yellow-400/50' : ''
        }`}
        style={{ height }}
        title={interactive ? "Click to adjust progress" : undefined}
      >
        <div
          className="striped-bar-yellow h-full rounded-full transition-all duration-300 relative"
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Subtle neon tip glow */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow-300 shadow-[0_0_8px_#d7fe03]" />
        </div>
      </div>

      {showPercentage && (
        <span className="text-xs font-bold font-mono text-white/90 min-w-[36px] text-right">
          {clampedProgress}%
        </span>
      )}
    </div>
  );
};
