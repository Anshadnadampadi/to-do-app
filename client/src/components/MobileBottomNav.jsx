import React from 'react';
import { CheckSquare, Flame, Target, Code2, FolderArchive } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav = ({ activeSection, onSelectSection }) => {
  const { tasks, habits, goals, dsa, uploads } = useApp();

  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const navItems = [
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      badge: tasks.length > 0 ? `${completedTasks}/${tasks.length}` : null
    },
    {
      id: 'habits',
      label: 'Habits',
      icon: Flame,
      badge: habits.length > 0 ? `${habits.length}` : null
    },
    {
      id: 'goals-projects',
      label: 'Goals',
      icon: Target,
      badge: goals.length > 0 ? `${goals.length}` : null
    },
    {
      id: 'dsa-ai',
      label: 'DSA & AI',
      icon: Code2,
      badge: dsa?.totalSolved ? `${dsa.totalSolved}` : null
    },
    {
      id: 'vault',
      label: 'Vault',
      icon: FolderArchive,
      badge: uploads.length > 0 ? `${uploads.length}` : null
    }
  ];

  return (
    <nav className="mobile-bottom-nav-bar md:hidden">
      <div className="flex items-center justify-around w-full max-w-md mx-auto px-1">
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
