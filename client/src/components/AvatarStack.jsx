import React from 'react';

export const AvatarStack = ({
  members = [],
  extraCount = 0,
  size = 26,
  showLabel = false,
  label = "Joined Members",
  className = ""
}) => {
  const displayMembers = members.slice(0, 3);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {showLabel && (
        <span className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
          {label}
        </span>
      )}
      <div className="flex items-center -space-x-2">
        {displayMembers.map((m, idx) => (
          <div
            key={idx}
            className="relative rounded-full border-2 border-[#12141c] overflow-hidden bg-slate-800 shrink-0"
            style={{ width: size, height: size }}
            title={m.name}
          >
            <img
              src={m.avatar || '/assets/maddox_avatar.jpg'}
              alt={m.name || 'Member'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
              }}
            />
          </div>
        ))}

        {extraCount > 0 && (
          <div
            className="flex items-center justify-center rounded-full border-2 border-[#12141c] bg-[#232734] text-white/90 font-semibold text-[10px] shrink-0"
            style={{ width: size, height: size }}
          >
            +{extraCount}
          </div>
        )}
      </div>
    </div>
  );
};
