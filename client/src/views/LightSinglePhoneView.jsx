import React, { useState } from 'react';
import { LightPhoneFrame } from '../components/LightPhoneFrame';
import { ScreenAddTaskBox } from './ScreenAddTaskBox';
import { ScreenTasksEvents } from './ScreenTasksEvents';
import { ScreenTodayTimeline } from './ScreenTodayTimeline';

export const LightSinglePhoneView = ({ onOpenTaskModal }) => {
  // 'box' (Screen 1) | 'events' (Screen 2) | 'timeline' (Screen 3)
  const [currentScreen, setCurrentScreen] = useState('timeline');

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-4">
      {/* Screen Selector Switcher Pills above phone */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#DCE9F6] shadow-sm mb-6 overflow-x-auto max-w-full">
        <button
          onClick={() => setCurrentScreen('box')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentScreen === 'box'
              ? 'bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] border border-[#0EA5E9] text-[#0F172A] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Add Task / Task Box
        </button>

        <button
          onClick={() => setCurrentScreen('events')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentScreen === 'events'
              ? 'bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] border border-[#0EA5E9] text-[#0F172A] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Tasks & Events
        </button>

        <button
          onClick={() => setCurrentScreen('timeline')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentScreen === 'timeline'
              ? 'bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] border border-[#0EA5E9] text-[#0F172A] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Today's Task Timeline
        </button>
      </div>

      {/* Light Phone Bezel */}
      <LightPhoneFrame currentTime="11:30">
        {currentScreen === 'box' && (
          <ScreenAddTaskBox
            onNavigateBack={() => setCurrentScreen('timeline')}
            onOpenAddModal={onOpenTaskModal}
          />
        )}

        {currentScreen === 'events' && (
          <ScreenTasksEvents
            onOpenAddModal={onOpenTaskModal}
            onNavigateToTimeline={() => setCurrentScreen('timeline')}
          />
        )}

        {currentScreen === 'timeline' && (
          <ScreenTodayTimeline
            onOpenAddModal={onOpenTaskModal}
            onNavigateToEvents={() => setCurrentScreen('events')}
            onNavigateToBox={() => setCurrentScreen('box')}
          />
        )}
      </LightPhoneFrame>
    </div>
  );
};
