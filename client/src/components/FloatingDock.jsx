import React from 'react';
import { Home, Calendar, CheckSquare, Flame, Award, BookOpen, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingDock = ({ activeTab, onTabChange }) => {
  const { habits, tasks } = useApp();

  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const activeHabitsToday = habits.filter(h => h.completedToday).length;

  const tabs = [
    { id: 'tasks', icon: Home, label: 'Today' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'habits', icon: Flame, label: 'Habits', badge: `${activeHabitsToday}/${habits.length}` },
    { id: 'dsa-ai', icon: Layers, label: 'Learning' },
    { id: 'achievements', icon: Award, label: 'Badges' }
  ];

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40">
      <div className="floating-dock px-3 py-2 flex items-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-11 h-11 bg-[#d7fe03] text-[#090a0f] shadow-[0_0_18px_rgba(215,254,3,0.45)] scale-105'
                  : 'w-10 h-10 text-white/50 hover:text-white hover:bg-white/10'
              }`}
              title={tab.label}
            >
              <Icon size={isActive ? 20 : 18} strokeWidth={isActive ? 2.5 : 2} />
              
              {/* Optional tiny notification badge for habits/tasks */}
              {!isActive && tab.badge && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#d7fe03] ring-2 ring-[#12141c]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
