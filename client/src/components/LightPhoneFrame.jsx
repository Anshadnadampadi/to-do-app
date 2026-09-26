import React from 'react';
import { Wifi, Battery } from 'lucide-react';

export const LightPhoneFrame = ({ children, currentTime = '11:30', className = '' }) => {
  return (
    <div className={`light-phone-mockup ${className}`}>
      {/* Dynamic Island */}
      <div className="phone-island">
        <div className="island-camera" />
        <div className="island-sensor" />
      </div>

      {/* Screen Container */}
      <div className="light-phone-screen pt-8 pb-8">
        {/* iOS Status Bar matching screenshot (11:30) */}
        <div className="w-full px-7 pt-1 pb-2 flex items-center justify-between text-[13px] font-bold text-slate-800 z-40 shrink-0 select-none">
          <span>{currentTime}</span>
          <div className="flex items-center gap-1.5 text-slate-800">
            {/* Cellular Signal Bars */}
            <svg width="15" height="11" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
              <rect x="4.5" y="5.5" width="2.5" height="5.5" rx="0.5" />
              <rect x="9" y="3" width="2.5" height="8" rx="0.5" />
              <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" />
            </svg>
            <Wifi size={13} strokeWidth={2.5} />
            <Battery size={16} strokeWidth={2.2} />
          </div>
        </div>

        {/* Screen Body */}
        <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="phone-home-indicator" style={{ background: '#CBD5E1' }} />
      </div>
    </div>
  );
};
