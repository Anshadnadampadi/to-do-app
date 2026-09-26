import React from 'react';
import { Home, CheckSquare, Flame, Calendar, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav = ({ activeSection, onSelectSection }) => {
  const { tasks, routines, habits } = useApp();

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const completedRoutines = routines.filter(r => r.isCompleted).length;

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      badge: tasks.length > 0 ? `${completedTasks}/${tasks.length}` : null
    },
    {
      id: 'routines',
      label: 'Tasks',
      icon: CheckSquare,
      badge: routines.length > 0 ? `${completedRoutines}/${routines.length}` : null
    },
    {
      id: 'habits',
      label: 'Habits',
      icon: Flame,
      badge: habits.length > 0 ? habits.length : null
    },
    {
      id: 'events',
      label: 'Calendar',
      icon: Calendar,
      badge: null
    },
    {
      id: 'vault',
      label: 'Arc Vault',
      icon: User,
      badge: null
    }
  ];

  return (
    <nav className="mobile-bottom-nav-bar md:hidden">
      <div className="flex items-center justify-around w-full max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
              type="button"
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-all duration-200 ${
                    isActive ? 'text-[#1867FF] scale-110' : 'text-slate-500'
                  }`}
                />
                {item.badge && (
                  <span className="mobile-nav-badge">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight font-bold transition-colors ${
                  isActive ? 'text-[#1867FF]' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#1867FF] -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
