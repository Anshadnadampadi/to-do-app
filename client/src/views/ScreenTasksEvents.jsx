import React, { useState } from 'react';
import {
  Menu,
  Search,
  MessageSquare,
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AvatarStack } from '../components/AvatarStack';
import { LightFloatingDock } from '../components/LightFloatingDock';
import { INITIAL_EVENT_LOGS } from '../data/initialData';

export const ScreenTasksEvents = ({ onOpenAddModal, onNavigateToTimeline }) => {
  const {
    calendarDays,
    selectedDayNumber,
    selectDay,
    activeMonthIndex,
    setActiveMonthIndex,
    months,
    activeYear,
    activeScreen,
    setActiveScreen
  } = useApp();

  const [eventLogs, setEventLogs] = useState(INITIAL_EVENT_LOGS);

  return (
    <div className="relative flex-1 flex flex-col px-5 pt-1 pb-24 overflow-y-auto select-none bg-[#F4F7FB]">
      {/* Top Header matching screenshot */}
      <div className="w-full flex items-center justify-between pt-1 pb-3">
        {/* Left Hamburger Button */}
        <button
          className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          title="Menu"
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
          <span className="text-[10px] font-mono">{activeYear || new Date().getFullYear()}</span>
          <span className="text-xs">{months[(activeMonthIndex - 1 + 12) % 12]}</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-mono text-slate-500 font-bold">{activeYear || new Date().getFullYear()}</span>
          <span className="text-base font-black text-slate-800 tracking-tight">
            {months[activeMonthIndex]}
          </span>
        </div>

        <button
          onClick={() => setActiveMonthIndex(activeMonthIndex + 1)}
          className="flex flex-col items-center text-slate-400 hover:text-slate-600 transition-colors"
          type="button"
        >
          <span className="text-[10px] font-mono">{activeYear || new Date().getFullYear()}</span>
          <span className="text-xs">{months[(activeMonthIndex + 1) % 12]}</span>
        </button>
      </div>

      {/* Horizontal Date Picker from Screenshot (25 Fri, 25 Sat, 26 Sun, 27 Mon...) */}
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

      {/* Event Cards Section matching Screenshot (Fri 25 Vacation, Sat 26 Conference, Sun 27 Hiking) */}
      <div className="mt-6 flex flex-col gap-4">
        {eventLogs.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            {/* Left Date Label from Screenshot (e.g. Fri 25) */}
            <div className="w-10 pt-2 flex flex-col items-center shrink-0">
              <span className="text-xs font-semibold text-slate-400">{item.dayLabel}</span>
              <span className="text-base font-extrabold text-slate-800 leading-tight">
                {item.dateNumber}
              </span>
            </div>

            {/* Right White Card */}
            <div className="flex-1 p-4 rounded-3xl bg-white border border-slate-100 shadow-[0_4px_16px_rgba(24,39,75,0.05)] flex flex-col justify-between gap-3">
              {/* Card Top: Title & Circular Badge (1, 2, 3) */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-800 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>

                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {item.badgeNumber}
                </div>
              </div>

              {/* Card Bottom: Stats (💬 comments, ⏳ duration) + Member Avatars */}
              <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={13} className="text-slate-400" />
                    {item.commentsCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-slate-400" />
                    {item.timeDurationHours}
                  </span>
                </div>

                <AvatarStack
                  members={item.members}
                  extraCount={item.joinedExtra || 1}
                  size={24}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Navigation Pill & Plus Button */}
      <LightFloatingDock
        activeTab="calendar"
        onTabChange={(tab) => {
          if (tab === 'calendar') onNavigateToTimeline();
        }}
        onOpenAddModal={onOpenAddModal}
      />
    </div>
  );
};
