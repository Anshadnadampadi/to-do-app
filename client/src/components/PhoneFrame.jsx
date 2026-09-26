import React from 'react';
import { Wifi, Battery } from 'lucide-react';

export const PhoneFrame = ({ children, title = '', currentTime = '9:40 PM', className = '' }) => {
  return (
    <div className={`phone-mockup ${className}`}>
      {/* Dynamic Island */}
      <div className="phone-island">
        <div className="island-camera" />
        <div className="island-sensor" />
      </div>

      {/* Screen container */}
      <div className="phone-screen pt-8 pb-10">
        {/* iOS Status Bar */}
        <div className="w-full px-7 pt-1 pb-2 flex items-center justify-between text-[13px] font-semibold text-white/90 z-40 shrink-0">
          <span>{currentTime}</span>
          <div className="flex items-center gap-1.5 opacity-90">
            {/* Cellular signal bars */}
            <svg width="15" height="11" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
              <rect x="4.5" y="5.5" width="2.5" height="5.5" rx="0.5" />
              <rect x="9" y="3" width="2.5" height="8" rx="0.5" />
              <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" />
            </svg>
            <Wifi size={13} strokeWidth={2.5} />
            <div className="flex items-center gap-0.5">
              <Battery size={16} strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
};
