import React, { useState } from 'react';
import {
  Menu,
  Search,
  CheckCircle2,
  Clock,
  MoreVertical,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AvatarStack } from '../components/AvatarStack';
import { LightFloatingDock } from '../components/LightFloatingDock';

export const ScreenTodayTimeline = ({ onOpenAddModal, onNavigateToEvents, onNavigateToBox }) => {
  const {
    tasks,
    toggleTaskCompleted,
    calendarDays,
    selectedDayNumber,
    selectDay,
    showToast,
    activeMonthIndex,
    setActiveMonthIndex,
    months,
    activeYear,
    currentYear
  } = useApp();

  // Specific timeline tasks from Screen 3:
  // "Design Wireframes For Task", "Review User Feedback", "Finalize UI Kit"
  const timelineTasks = tasks.slice(0, 4);

  return (
    <div className="relative flex-1 flex flex-col px-5 pt-1 pb-24 overflow-y-auto select-none bg-[#F4F7FB]">
      {/* Top Header matching screenshot */}
      <div className="w-full flex items-center justify-between pt-1 pb-3">
        {/* Left Hamburger Button */}
        <button
          onClick={onNavigateToBox}
          className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          title="Open Routine Task Box"
        >
          <Menu size={18} strokeWidth={2.2} />
        </button>

        {/* Center Title */}
        <h1 className="text-base font-bold text-slate-800 tracking-tight">
          Tasks
        </h1>

        {/* Right Search Button */}
        <button
          className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          title="Search"
        >
          <Search size={18} strokeWidth={2.2} />
        </button>
      </div>

      {/* Month Carousel */}
      <div className="mt-2 flex items-center justify-between px-2 text-xs font-semibold">
        <button
          onClick={() => setActiveMonthIndex(activeMonthIndex - 1)}
          className="flex flex-col items-center text-slate-400 hover:text-slate-600 transition-colors"
          type="button"
        >
          <span className="text-[10px] font-mono">{activeYear || currentYear}</span>
          <span className="text-xs">{months[(activeMonthIndex - 1 + 12) % 12]}</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-mono text-slate-500 font-bold">{activeYear || currentYear}</span>
          <span className="text-base font-black text-slate-800 tracking-tight">
            {months[activeMonthIndex]}
          </span>
        </div>

        <button
          onClick={() => setActiveMonthIndex(activeMonthIndex + 1)}
          className="flex flex-col items-center text-slate-400 hover:text-slate-600 transition-colors"
          type="button"
        >
          <span className="text-[10px] font-mono">{activeYear || currentYear}</span>
          <span className="text-xs">{months[(activeMonthIndex + 1) % 12]}</span>
        </button>
      </div>

      {/* Horizontal Date Picker matching screenshot: 27 Mon highlighted in Royal Blue */}
      <div className="mt-4 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
        {calendarDays.map((item, idx) => {
          const isSelected = item.dateNumber === selectedDayNumber;

          return (
            <button
              key={idx}
              onClick={() => selectDay(item.dateNumber)}
              className={`flex-1 min-w-[42px] py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-[#1867FF] text-white shadow-[0_4px_14px_rgba(24,103,255,0.35)] scale-105'
                  : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                {item.dateNumber}
              </span>
              <span className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
                {item.dayName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Today's Task Section Header from Screenshot */}
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
          Today's Task
        </h2>
        <button
          onClick={onNavigateToEvents}
          className="text-xs font-bold text-[#0EA5E9] hover:underline"
        >
          See all
        </button>
      </div>

      {/* Vertical Connected Timeline matching Screenshot */}
      <div className="relative mt-4 flex flex-col gap-5">
        {/* Dotted Connecting Line */}
        <div className="timeline-dashed-line" />

        {timelineTasks.map((task, idx) => {
          const isDone = task.status === 'completed';

          return (
            <div key={task.id} className="relative flex items-start gap-4 z-10">
              {/* Left Column: Time Node matching screenshot (10:00 AM, 11:30 AM, 1:00 PM) */}
              <div className="w-14 pt-3 flex flex-col items-start shrink-0">
                <span className="text-[11px] font-bold text-slate-400 font-mono tracking-tight whitespace-nowrap">
                  {task.timeLabel || task.time}
                </span>
              </div>

              {/* Right Column: Clean White Card from Screenshot */}
              <div
                onClick={() => toggleTaskCompleted(task.id)}
                className={`flex-1 p-4 rounded-3xl bg-white border border-slate-100 shadow-[0_4px_16px_rgba(24,39,75,0.05)] hover:shadow-md cursor-pointer transition-all ${
                  isDone ? 'opacity-70 bg-slate-50' : ''
                }`}
              >
                {/* Title */}
                <h3
                  className={`text-sm sm:text-base font-bold tracking-tight ${
                    isDone ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}
                >
                  {task.title}
                </h3>

                {/* Bottom Row: Status Badge (In Progress / Pending) + Member Avatars */}
                <div className="mt-3 flex items-center justify-between">
                  {/* Status Badge */}
                  {task.statusBadge === 'Pending' || task.priority === 'Medium' ? (
                    <span className="badge-pending">
                      Pending
                    </span>
                  ) : isDone ? (
                    <span className="badge-completed">
                      Completed ✓
                    </span>
                  ) : (
                    <span className="badge-in-progress">
                      In Progress
                    </span>
                  )}

                  {/* Member Avatars with Blue +N Count Badge */}
                  <AvatarStack
                    members={task.members}
                    extraCount={task.joinedExtra || 1}
                    size={24}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Navigation Pill & Plus Button */}
      <LightFloatingDock
        activeTab="calendar"
        onTabChange={(tab) => {
          if (tab === 'list') onNavigateToBox();
          if (tab === 'home') onNavigateToEvents();
        }}
        onOpenAddModal={onOpenAddModal}
      />
    </div>
  );
};
