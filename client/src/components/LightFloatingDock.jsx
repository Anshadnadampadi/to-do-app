import React from 'react';
import { Home, Calendar, List, User, Plus } from 'lucide-react';

export const LightFloatingDock = ({ activeTab = 'calendar', onTabChange, onOpenAddModal }) => {
  return (
    <div className="absolute bottom-5 left-0 right-0 px-6 flex items-center justify-between pointer-events-none z-40">
      {/* Pill Dock with Tabs */}
      <div className="light-floating-dock pointer-events-auto">
        {/* Tab 1: Home */}
        <button
          onClick={() => onTabChange && onTabChange('home')}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'home'
              ? 'bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white shadow-[0_4px_12px_rgba(14,165,233,0.35)]'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Home"
        >
          <Home size={18} strokeWidth={2.2} />
        </button>

        {/* Tab 2: Calendar / Schedule (Active in screenshot) */}
        <button
          onClick={() => onTabChange && onTabChange('calendar')}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'calendar'
              ? 'bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white shadow-[0_4px_12px_rgba(14,165,233,0.35)]'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Calendar / Schedule"
        >
          <Calendar size={18} strokeWidth={2.2} />
        </button>

        {/* Tab 3: List / Task Box */}
        <button
          onClick={() => onTabChange && onTabChange('list')}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'list'
              ? 'bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white shadow-[0_4px_12px_rgba(14,165,233,0.35)]'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Task Box & Routines"
        >
          <List size={18} strokeWidth={2.2} />
        </button>

        {/* Tab 4: Profile / Habits */}
        <button
          onClick={() => onTabChange && onTabChange('profile')}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            activeTab === 'profile'
              ? 'bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white shadow-[0_4px_12px_rgba(14,165,233,0.35)]'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Habits & Profile"
        >
          <User size={18} strokeWidth={2.2} />
        </button>
      </div>

      {/* Floating Action Button '+' from Screenshot */}
      <button
        onClick={onOpenAddModal}
        className="dock-action-plus pointer-events-auto"
        title="Add new task"
      >
        <Plus size={20} strokeWidth={2.4} />
      </button>
    </div>
  );
};
