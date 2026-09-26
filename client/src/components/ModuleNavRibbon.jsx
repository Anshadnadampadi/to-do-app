import React from 'react';
import {
  CheckCircle2,
  BarChart3,
  Code2,
  Target,
  Flame,
  BookOpen,
  FolderArchive
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ModuleNavRibbon = () => {
  const {
    activeModule,
    setActiveModule,
    tasks,
    dsa,
    goals,
    habits,
    journals,
    uploads
  } = useApp();

  const navItems = [
    {
      id: 'tasks',
      label: 'Tasks & Schedule',
      shortLabel: 'Tasks',
      icon: <CheckCircle2 size={16} strokeWidth={2.4} />,
      badge: tasks.length
    },
    {
      id: 'analytics',
      label: 'Analytics & Metrics',
      shortLabel: 'Analytics',
      icon: <BarChart3 size={16} strokeWidth={2.4} />,
      badge: '92%'
    },
    {
      id: 'dsa-ai',
      label: 'DSA & AI Roadmap',
      shortLabel: 'DSA & AI',
      icon: <Code2 size={16} strokeWidth={2.4} />,
      badge: `${dsa.totalSolved} Solved`
    },
    {
      id: 'goals-projects',
      label: 'Goals & Projects',
      shortLabel: 'Goals',
      icon: <Target size={16} strokeWidth={2.4} />,
      badge: `${goals.length} Goals`
    },
    {
      id: 'habits',
      label: 'Habit Tracker',
      shortLabel: 'Habits',
      icon: <Flame size={16} strokeWidth={2.4} />,
      badge: `${habits.length}`
    },
    {
      id: 'journal',
      label: 'Daily Journal',
      shortLabel: 'Journal',
      icon: <BookOpen size={16} strokeWidth={2.4} />,
      badge: `${journals.length}`
    },
    {
      id: 'vault',
      label: 'Vault & Badges',
      shortLabel: 'Vault',
      icon: <FolderArchive size={16} strokeWidth={2.4} />,
      badge: `${uploads.length}`
    }
  ];

  return (
    <div className="module-nav-ribbon-wrapper">
      <div className="module-nav-ribbon-bar">
        {navItems.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`module-nav-item ${isActive ? 'active' : ''}`}
              type="button"
            >
              <span className="module-item-icon">{item.icon}</span>
              <span className="module-item-label hidden md:inline">{item.label}</span>
              <span className="module-item-label md:hidden">{item.shortLabel}</span>

              {item.badge && (
                <span className="module-badge">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
