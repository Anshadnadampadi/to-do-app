import React from 'react';
import { LightPhoneFrame } from '../components/LightPhoneFrame';
import { ScreenAddTaskBox } from './ScreenAddTaskBox';
import { ScreenTasksEvents } from './ScreenTasksEvents';
import { ScreenTodayTimeline } from './ScreenTodayTimeline';

export const ShowcaseTriViewLight = ({ onOpenTaskModal, onOpenJournalModal }) => {
  return (
    <div className="w-full flex items-center justify-center py-6 px-4">
      <div className="flex flex-col xl:flex-row items-center justify-center gap-8 lg:gap-10 max-w-7xl mx-auto">
        {/* Phone 1: Add Task & Task Box */}
        <div className="flex flex-col items-center">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] px-3.5 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] shadow-sm">
              Screen 1 • Add Task & Task Box
            </span>
          </div>
          <LightPhoneFrame currentTime="11:30">
            <ScreenAddTaskBox
              onNavigateBack={() => {
                const centerEl = document.getElementById('phone-light-center');
                if (centerEl) centerEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAddModal={onOpenTaskModal}
            />
          </LightPhoneFrame>
        </div>

        {/* Phone 2: Tasks Events & Monthly View */}
        <div id="phone-light-center" className="flex flex-col items-center">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] px-3.5 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] shadow-sm">
              Screen 2 • Tasks & Events
            </span>
          </div>
          <LightPhoneFrame currentTime="11:30">
            <ScreenTasksEvents
              onOpenAddModal={onOpenTaskModal}
              onNavigateToTimeline={() => {
                const rightEl = document.getElementById('phone-light-right');
                if (rightEl) rightEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </LightPhoneFrame>
        </div>

        {/* Phone 3: Today's Task Vertical Timeline */}
        <div id="phone-light-right" className="flex flex-col items-center">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] px-3.5 py-1 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] shadow-sm">
              Screen 3 • Today's Task Timeline
            </span>
          </div>
          <LightPhoneFrame currentTime="11:30">
            <ScreenTodayTimeline
              onOpenAddModal={onOpenTaskModal}
              onNavigateToEvents={() => {
                const centerEl = document.getElementById('phone-light-center');
                if (centerEl) centerEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onNavigateToBox={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </LightPhoneFrame>
        </div>
      </div>
    </div>
  );
};
