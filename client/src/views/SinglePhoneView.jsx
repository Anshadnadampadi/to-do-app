import React from 'react';
import { PhoneFrame } from '../components/PhoneFrame';
import { ScreenOnboarding } from './ScreenOnboarding';
import { ScreenTodayTasks } from './ScreenTodayTasks';
import { ScreenWorkToday } from './ScreenWorkToday';
import { ScreenHabits } from './ScreenHabits';
import { ScreenDsaAi } from './ScreenDsaAi';
import { ScreenAchievements } from './ScreenAchievements';
import { useApp } from '../context/AppContext';

export const SinglePhoneView = ({ onOpenTaskModal, onOpenJournalModal }) => {
  const { activeScreen, setActiveScreen } = useApp();

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'onboarding':
        return <ScreenOnboarding onGetStarted={() => setActiveScreen('tasks')} />;
      case 'tasks':
        return (
          <ScreenTodayTasks
            onNavigateToSchedule={() => setActiveScreen('schedule')}
            onOpenTaskModal={onOpenTaskModal}
          />
        );
      case 'schedule':
        return <ScreenWorkToday onOpenTaskModal={onOpenTaskModal} />;
      case 'habits':
        return <ScreenHabits />;
      case 'dsa-ai':
        return <ScreenDsaAi />;
      case 'achievements':
        return <ScreenAchievements />;
      default:
        return (
          <ScreenTodayTasks
            onNavigateToSchedule={() => setActiveScreen('schedule')}
            onOpenTaskModal={onOpenTaskModal}
          />
        );
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-4">
      {/* Screen quick selector pills above the phone */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 mb-5 overflow-x-auto max-w-full">
        <button
          onClick={() => setActiveScreen('onboarding')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeScreen === 'onboarding'
              ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          1. Onboarding
        </button>
        <button
          onClick={() => setActiveScreen('tasks')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeScreen === 'tasks'
              ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          2. Today Tasks
        </button>
        <button
          onClick={() => setActiveScreen('schedule')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeScreen === 'schedule'
              ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          3. Work Today
        </button>
        <button
          onClick={() => setActiveScreen('habits')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeScreen === 'habits'
              ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Habits
        </button>
        <button
          onClick={() => setActiveScreen('dsa-ai')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeScreen === 'dsa-ai'
              ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          DSA & AI
        </button>
        <button
          onClick={() => setActiveScreen('achievements')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeScreen === 'achievements'
              ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.35)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Badges
        </button>
      </div>

      {/* Interactive Phone Frame */}
      <PhoneFrame currentTime="9:40 PM">
        {renderActiveScreen()}
      </PhoneFrame>
    </div>
  );
};
