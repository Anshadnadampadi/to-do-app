import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Check,
  Clock,
  MessageSquare,
  Sparkles,
  Flame,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Smile,
  Home,
  Droplet,
  Coffee,
  Sun,
  Utensils,
  Trash2,
  Calendar as CalendarIcon,
  Pencil,
  Copy,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AvatarStack } from '../components/AvatarStack';
import { RoutineModal } from '../components/RoutineModal';
import { INITIAL_EVENT_LOGS } from '../data/initialData';
import { XP_REWARDS } from '../utils/gamification';

export const ResponsiveWebDashboard = ({ onOpenTaskModal, onOpenJournalModal }) => {
  const {
    tasks,
    toggleTaskCompleted,
    deleteTask,
    routines,
    toggleRoutine,
    deleteRoutine,
    duplicateRoutine,
    calendarDays,
    selectedDayNumber,
    selectDay,
    activeMonthIndex,
    setActiveMonthIndex,
    activeYear,
    setToday,
    isViewingToday,
    months,
    currentYear = new Date().getFullYear(),
    habits,
    toggleHabitToday,
    searchQuery,
    setSearchQuery,
    showToast,
    triggerCelebration,
    addXp
  } = useApp();

  const [activeMenuRoutine, setActiveMenuRoutine] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('all'); // 'all', 'in-progress', 'pending', 'completed'
  const [activeMobileSection, setActiveMobileSection] = useState('timeline'); // 'timeline', 'routines', 'events', 'habits'
  const [activeRoutineSegment, setActiveRoutineSegment] = useState('task-box');

  const handleOpenMenu = (e, routine) => {
    e.stopPropagation();
    if (activeMenuRoutine?.id === routine.id) {
      setActiveMenuRoutine(null);
      setMenuPosition(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 185;
    const menuHeight = 175;

    // Align menu to the left of the button to keep it cleanly inside the card and on screen
    let left = rect.right - menuWidth - 4;
    if (left < 12) left = 12;
    if (left + menuWidth > window.innerWidth - 12) {
      left = window.innerWidth - menuWidth - 12;
    }

    let top = rect.bottom + 6;
    if (top + menuHeight > window.innerHeight - 12 && rect.top > menuHeight + 12) {
      top = rect.top - menuHeight - 6;
    }

    setMenuPosition({ top, left });
    setActiveMenuRoutine(routine);
  };

  useEffect(() => {
    const handleClose = () => {
      if (activeMenuRoutine) {
        setActiveMenuRoutine(null);
        setMenuPosition(null);
      }
    };
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, [activeMenuRoutine]);

  const selectedPillRef = useRef(null);

  useEffect(() => {
    if (selectedPillRef.current) {
      selectedPillRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [selectedDayNumber, activeMonthIndex]);

  const getRoutineIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={17} className="text-slate-600" />;
      case 'Smile': return <Smile size={17} className="text-slate-600" />;
      case 'Home': return <Home size={17} className="text-slate-600" />;
      case 'Droplet': return <Droplet size={17} className="text-slate-600" />;
      case 'Coffee': return <Coffee size={17} className="text-slate-600" />;
      case 'BookOpen': return <BookOpen size={17} className="text-slate-600" />;
      case 'Sun': return <Sun size={17} className="text-slate-600" />;
      case 'Utensils': return <Utensils size={17} className="text-slate-600" />;
      default: return <Sparkles size={17} className="text-slate-600" />;
    }
  };

  // Filter tasks based on search & tab
  const filteredTasks = tasks.filter(task => {
    if (activeFilterTab === 'in-progress' && task.statusBadge !== 'In Progress') return false;
    if (activeFilterTab === 'pending' && task.statusBadge !== 'Pending') return false;
    if (activeFilterTab === 'completed' && task.status !== 'completed') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return task.title.toLowerCase().includes(q) ||
             (task.description && task.description.toLowerCase().includes(q)) ||
             task.category.toLowerCase().includes(q);
    }
    return true;
  });

  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.statusBadge === 'In Progress').length;
  const pendingCount = tasks.filter(t => t.statusBadge === 'Pending').length;
  const completedRoutinesCount = routines.filter(r => r.isCompleted).length;

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* ===================================================================
          1. TOP DATE & MONTH CARD
          =================================================================== */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(24,39,75,0.04)] flex flex-col gap-5">
        {/* Month Selector Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Previous Month Button */}
            <button
              onClick={() => setActiveMonthIndex(activeMonthIndex - 1)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
              title="Previous Month"
              type="button"
            >
              <ChevronLeft size={18} strokeWidth={2.4} />
            </button>

            {/* Current Month & Year Display */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono font-bold text-slate-400 tracking-wider">
                {activeYear || currentYear}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                {months[activeMonthIndex]}
              </span>
            </div>

            {/* Next Month Button */}
            <button
              onClick={() => setActiveMonthIndex(activeMonthIndex + 1)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
              title="Next Month"
              type="button"
            >
              <ChevronRight size={18} strokeWidth={2.4} />
            </button>

            {/* Quick Set to Today Button */}
            <button
              onClick={setToday}
              className={`ml-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isViewingToday
                  ? 'bg-[#1867FF] text-white shadow-[0_2px_10px_rgba(24,103,255,0.35)]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Jump & Sync to Today's Real Date"
              type="button"
            >
              <CalendarIcon size={13} strokeWidth={2.5} />
              <span>Today</span>
              {isViewingToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          </div>

          {/* Quick Summary Pill & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1867FF]" />
              <span>{completedTasksCount}/{tasks.length} Tasks Done</span>
              <span className="text-slate-300">•</span>
              <span>{completedRoutinesCount}/{routines.length} Routines</span>
            </div>

            <button
              onClick={onOpenTaskModal}
              className="btn-primary-blue text-xs py-2 px-4"
              title="Add task"
            >
              <Plus size={15} strokeWidth={2.6} />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Horizontal Dates Strip matching Screenshot */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
          {calendarDays.map((item, idx) => {
            const isSelected = item.dateNumber === selectedDayNumber;

            return (
              <button
                key={`${item.dateNumber}-${idx}`}
                ref={isSelected ? selectedPillRef : null}
                onClick={() => {
                  selectDay(item.dateNumber);
                  showToast(`Selected ${months[activeMonthIndex]} ${item.dateNumber}, ${activeYear || currentYear}`);
                }}
                className={`calendar-day-btn ${isSelected ? 'active' : ''} ${item.isToday ? 'ring-2 ring-[#1867FF]/30' : ''}`}
                type="button"
              >
                <span className="date-num">
                  {item.dateNumber}
                </span>
                <span className="date-name">
                  {item.dayName}
                </span>
                {item.isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-[#1867FF]'}`} title="Today" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Mobile-Only Section Tabs (Visible only below lg screens) */}
      <div className="lg:hidden flex items-center gap-1 p-1 bg-slate-100/90 border border-slate-200/80 rounded-2xl shadow-xs overflow-x-auto">
        <button
          onClick={() => setActiveMobileSection('timeline')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeMobileSection === 'timeline'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Today's Tasks ({tasks.length})
        </button>

        <button
          onClick={() => setActiveMobileSection('routines')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeMobileSection === 'routines'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Task Box ({completedRoutinesCount}/{routines.length})
        </button>

        <button
          onClick={() => setActiveMobileSection('events')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeMobileSection === 'events'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Events & Trips
        </button>

        <button
          onClick={() => setActiveMobileSection('habits')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeMobileSection === 'habits'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Habits & Streak
        </button>
      </div>

      {/* ===================================================================
          2. MAIN RESPONSIVE WORKSPACE (2-COLUMN ON DESKTOP)
          =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===================================================================
            COLUMN 1: TODAY'S TASKS TIMELINE (7 COLS ON DESKTOP)
            =================================================================== */}
        <div className={`lg:col-span-7 flex flex-col gap-5 ${
          activeMobileSection !== 'timeline' ? 'hidden lg:flex' : 'flex'
        }`}>
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(24,39,75,0.04)] flex flex-col">
            {/* Header: Title & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Today's Task
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {months[activeMonthIndex]} {selectedDayNumber}, {currentYear} • Daily Schedule
                </span>
              </div>

              {/* Clear Filter Tabs with Clean Modern Text */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200/70 text-xs">
                <button
                  onClick={() => setActiveFilterTab('all')}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    activeFilterTab === 'all'
                      ? 'bg-white text-slate-900 border border-slate-200 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  All ({tasks.length})
                </button>

                <button
                  onClick={() => setActiveFilterTab('in-progress')}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    activeFilterTab === 'in-progress'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  In Progress ({inProgressCount})
                </button>

                <button
                  onClick={() => setActiveFilterTab('pending')}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    activeFilterTab === 'pending'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  Pending ({pendingCount})
                </button>

                <button
                  onClick={() => setActiveFilterTab('completed')}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    activeFilterTab === 'completed'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200/80 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  Done ({completedTasksCount})
                </button>
              </div>
            </div>

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <Check size={22} />
                </div>
                <p className="text-sm font-bold text-slate-700">No tasks match this filter</p>
                <p className="text-xs text-slate-400 mt-1">Try selecting "All" or create a new task</p>
                <button
                  onClick={onOpenTaskModal}
                  className="mt-4 btn-primary-blue text-xs py-2 px-4"
                >
                  <Plus size={15} />
                  <span>Create Task</span>
                </button>
              </div>
            )}

            {/* Vertical Connected Timeline */}
            {filteredTasks.length > 0 && (
              <div className="relative mt-6 flex flex-col gap-4">
                {/* Dotted Vertical Connecting Line */}
                <div className="timeline-dashed-line" />

                {filteredTasks.map((task) => {
                  const isDone = task.status === 'completed';

                  return (
                    <div key={task.id} className="relative flex items-start gap-4 z-10 group">
                      {/* Left: Time Node from Screenshot (10:00 AM, 11:30 AM, 1:00 PM) */}
                      <div className="w-16 pt-3 flex flex-col items-start shrink-0">
                        <span className="text-xs font-bold text-slate-500 font-mono tracking-tight whitespace-nowrap bg-white pr-1">
                          {task.timeLabel || task.time}
                        </span>
                      </div>

                      {/* Right: Elevated White Task Card */}
                      <div
                        className={`flex-1 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-md hover:border-slate-300 transition-all ${
                          isDone ? 'bg-slate-50/70 opacity-80' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          {/* Title & Description */}
                          <div className="flex-1 cursor-pointer" onClick={() => toggleTaskCompleted(task.id)}>
                            <h3
                              className={`text-base font-bold tracking-tight ${
                                isDone ? 'line-through text-slate-400' : 'text-slate-900'
                              }`}
                            >
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {task.description}
                              </p>
                            )}
                          </div>

                          {/* Visible, Interactive Tick / Check Button */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => toggleTaskCompleted(task.id)}
                              className={`task-tick-btn ${isDone ? 'checked' : ''}`}
                              title={isDone ? 'Task completed (click to undo)' : 'Click to complete task'}
                            >
                              <Check size={16} strokeWidth={3} />
                            </button>

                            <button
                              onClick={() => deleteTask(task.id)}
                              className="w-7 h-7 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                              title="Delete task"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Card Bottom: Status Pill Badge + Team Avatars */}
                        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
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

                          {/* Member Avatars */}
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
            )}
          </div>
        </div>

        {/* ===================================================================
            COLUMN 2: ROUTINE TASK BOX, EVENTS & HABITS (5 COLS ON DESKTOP)
            =================================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* ===================================================================
              CARD 1: ROUTINE TASK BOX (Screen 1 from Screenshot)
              =================================================================== */}
          <div className={`p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] flex flex-col ${
            activeMobileSection !== 'routines' ? 'hidden lg:flex' : 'flex'
          }`}>
            {/* Segmented Switcher from Screenshot (Add Routine | Routine Box) */}
            <div className="w-full flex items-center justify-center pb-4 border-b border-slate-100">
              <div className="segmented-control w-full max-w-[280px]">
                <button
                  onClick={() => {
                    setActiveRoutineSegment('add-task');
                    setEditingRoutine(null);
                    setIsRoutineModalOpen(true);
                  }}
                  className={`flex-1 segmented-button ${
                    activeRoutineSegment === 'add-task' ? 'active' : ''
                  }`}
                  type="button"
                >
                  <Plus size={13} strokeWidth={2.6} className="inline mr-1" />
                  Add Routine
                </button>

                <button
                  onClick={() => setActiveRoutineSegment('task-box')}
                  className={`flex-1 segmented-button ${
                    activeRoutineSegment === 'task-box' ? 'active' : ''
                  }`}
                  type="button"
                >
                  Routine Box
                </button>
              </div>
            </div>

            {/* Header info */}
            <div className="flex items-center justify-between pt-3 pb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Routine Checklist
                </h3>
                <span className="text-xs text-slate-500">
                  {completedRoutinesCount} of {routines.length} completed
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingRoutine(null);
                    setIsRoutineModalOpen(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#1867FF] hover:text-white text-[11px] font-bold text-slate-700 transition-colors flex items-center gap-1"
                  title="Add new routine"
                  type="button"
                >
                  <Plus size={12} strokeWidth={2.6} />
                  <span>New</span>
                </button>

                <span className="text-[11px] font-bold text-[#1867FF] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                  {routines.length ? Math.round((completedRoutinesCount / routines.length) * 100) : 0}%
                </span>
              </div>
            </div>

            {/* Checklist Items matching Screenshot */}
            <div className="mt-3 flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1">
              {routines.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleRoutine(item.id)}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs flex items-center justify-between cursor-pointer transition-all duration-200 relative"
                >
                  <div className="flex items-center gap-3">
                    {/* Outline Icon Container */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                        item.isCompleted
                          ? 'bg-[#1867FF] text-white shadow-xs'
                          : 'bg-slate-50 border border-slate-200 text-slate-600'
                      }`}
                    >
                      {item.isCompleted ? (
                        <Check size={16} strokeWidth={3} />
                      ) : (
                        getRoutineIcon(item.iconName)
                      )}
                    </div>

                    {/* Routine Title & Time */}
                    <div className="flex flex-col">
                      <span
                        className={`text-xs sm:text-sm font-semibold tracking-tight ${
                          item.isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions: Visible Tick Button & 3-dots */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRoutine(item.id);
                      }}
                      className={`routine-tick-btn ${item.isCompleted ? 'checked' : ''}`}
                      title={item.isCompleted ? 'Routine completed (click to undo)' : 'Click to complete routine'}
                      type="button"
                    >
                      <Check size={14} strokeWidth={3} />
                    </button>

                    <button
                      onClick={(e) => handleOpenMenu(e, item)}
                      className={`p-1.5 rounded-lg transition-all border-none ${
                        activeMenuRoutine?.id === item.id
                          ? 'bg-slate-200 text-slate-900 ring-2 ring-[#1867FF]/25 shadow-xs'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title="Routine options"
                      type="button"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================================
              CARD 2: SCHEDULED EVENTS & TRIPS (Screen 2 from Screenshot)
              =================================================================== */}
          <div className={`p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] flex flex-col ${
            activeMobileSection !== 'events' ? 'hidden lg:flex' : 'flex'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Scheduled Events & Trips
                </h3>
                <span className="text-xs text-slate-500">
                  {months[activeMonthIndex]} Calendar Highlights
                </span>
              </div>
              <span className="text-xs font-bold text-[#1867FF] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">Upcoming</span>
            </div>

            {/* Event items matching Screenshot (Vacation, Conference, Hiking) */}
            <div className="mt-4 flex flex-col gap-3">
              {INITIAL_EVENT_LOGS.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-[0_2px_8px_rgba(15,23,42,0.02)] flex flex-col gap-2.5 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#1867FF]">
                          {event.dayLabel} {event.dateNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">
                          {event.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        {event.description}
                      </p>
                    </div>

                    {/* Circular Badge 1, 2, 3 */}
                    <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 text-[#1867FF] font-bold text-xs flex items-center justify-center shrink-0">
                      {event.badgeNumber}
                    </div>
                  </div>

                  {/* Stats & Avatars */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <MessageSquare size={13} className="text-slate-400" />
                        {event.commentsCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" />
                        {event.timeDurationHours}h
                      </span>
                    </div>

                    <AvatarStack
                      members={event.members}
                      extraCount={event.joinedExtra || 1}
                      size={22}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================================
              CARD 3: WINTER ARC HABITS & STREAK TRACKER
              =================================================================== */}
          <div className={`p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] flex flex-col ${
            activeMobileSection !== 'habits' ? 'hidden lg:flex' : 'flex'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Winter Arc Habit Streaks
                </h3>
              </div>
              <button
                onClick={onOpenJournalModal}
                className="text-xs font-bold text-[#1867FF] hover:underline"
              >
                Log Reflection
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  onClick={() => toggleHabitToday(habit.id)}
                  className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleHabitToday(habit.id);
                      }}
                      className={`habit-tick-btn ${habit.completedToday ? 'checked' : ''}`}
                      title={habit.completedToday ? 'Habit completed today (click to undo)' : 'Click to complete habit'}
                    >
                      <Check size={14} strokeWidth={3} />
                    </button>
                    <span className={`text-xs font-bold ${habit.completedToday ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {habit.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Flame size={12} className="text-amber-500" />
                    <span>{habit.streak}d streak</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button '+' for Quick Mobile Task Creation */}
      <button
        onClick={onOpenTaskModal}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#1867FF] text-white shadow-[0_8px_24px_rgba(24,103,255,0.4)] hover:bg-[#1055E8] hover:scale-105 active:scale-95 flex items-center justify-center z-40 transition-all border-none"
        title="Add new task"
      >
        <Plus size={26} strokeWidth={2.8} />
      </button>

      {/* Fixed Routine 3-dots Dropdown Menu (Escapes scrollable clipping) */}
      {activeMenuRoutine && menuPosition && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          <div
            className="fixed inset-0 bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuRoutine(null);
              setMenuPosition(null);
            }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              width: '185px'
            }}
            className="routine-actions-menu animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-0.5 select-none"
          >
            <button
              onClick={() => {
                toggleRoutine(activeMenuRoutine.id);
                setActiveMenuRoutine(null);
                setMenuPosition(null);
              }}
              className="routine-actions-item"
              type="button"
            >
              {activeMenuRoutine.isCompleted ? (
                <>
                  <RotateCcw size={15} className="text-amber-500 shrink-0" />
                  <span>Mark Incomplete</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  <span>Mark Completed</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setEditingRoutine(activeMenuRoutine);
                setIsRoutineModalOpen(true);
                setActiveMenuRoutine(null);
                setMenuPosition(null);
              }}
              className="routine-actions-item"
              type="button"
            >
              <Pencil size={15} className="text-[#1867FF] shrink-0" />
              <span>Edit Routine</span>
            </button>

            <button
              onClick={() => {
                duplicateRoutine(activeMenuRoutine.id);
                setActiveMenuRoutine(null);
                setMenuPosition(null);
              }}
              className="routine-actions-item"
              type="button"
            >
              <Copy size={15} className="text-slate-500 shrink-0" />
              <span>Duplicate</span>
            </button>

            <div className="h-px bg-slate-100 my-1" />

            <button
              onClick={() => {
                deleteRoutine(activeMenuRoutine.id);
                setActiveMenuRoutine(null);
                setMenuPosition(null);
              }}
              className="routine-actions-item danger"
              type="button"
            >
              <Trash2 size={15} className="shrink-0" />
              <span>Delete Routine</span>
            </button>
          </div>
        </div>
      )}

      {/* Routine Add / Edit Modal */}
      <RoutineModal
        isOpen={isRoutineModalOpen}
        onClose={() => {
          setIsRoutineModalOpen(false);
          setEditingRoutine(null);
        }}
        routineToEdit={editingRoutine}
      />
    </div>
  );
};
