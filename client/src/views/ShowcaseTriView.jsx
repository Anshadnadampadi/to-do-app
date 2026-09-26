import React from 'react';
import { PhoneFrame } from '../components/PhoneFrame';
import { ScreenOnboarding } from './ScreenOnboarding';
import { ScreenTodayTasks } from './ScreenTodayTasks';
import { ScreenWorkToday } from './ScreenWorkToday';

export const ShowcaseTriView = ({ onOpenTaskModal, onOpenJournalModal }) => {
  return (
    <div className="w-full flex items-center justify-center py-6 px-4">
      <div className="flex flex-col xl:flex-row items-center justify-center gap-8 lg:gap-10 max-w-7xl mx-auto">
        {/* Phone 1: Onboarding / Daily Productivity Starts Here */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#d7fe03] px-3 py-1 rounded-full bg-[#d7fe03]/10 border border-[#d7fe03]/30">
              Screen 1 • Onboarding
            </span>
          </div>
          <PhoneFrame currentTime="9:40 PM">
            <ScreenOnboarding onGetStarted={() => {
              const centerEl = document.getElementById('phone-center-screen');
              if (centerEl) centerEl.scrollIntoView({ behavior: 'smooth' });
            }} />
          </PhoneFrame>
        </div>

        {/* Phone 2: Today Dashboard / Hello Maddox */}
        <div id="phone-center-screen" className="flex flex-col items-center">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#d7fe03] px-3 py-1 rounded-full bg-[#d7fe03]/10 border border-[#d7fe03]/30">
              Screen 2 • My Task Today
            </span>
          </div>
          <PhoneFrame currentTime="9:40 PM">
            <ScreenTodayTasks
              onNavigateToSchedule={() => {
                const rightEl = document.getElementById('phone-right-screen');
                if (rightEl) rightEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenTaskModal={onOpenTaskModal}
            />
          </PhoneFrame>
        </div>

        {/* Phone 3: Work for Today / Timeline & Calendar */}
        <div id="phone-right-screen" className="flex flex-col items-center">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#d7fe03] px-3 py-1 rounded-full bg-[#d7fe03]/10 border border-[#d7fe03]/30">
              Screen 3 • Work for Today
            </span>
          </div>
          <PhoneFrame currentTime="9:40 PM">
            <ScreenWorkToday onOpenTaskModal={onOpenTaskModal} />
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
};
