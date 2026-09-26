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
  CheckCircle2,
  Zap,
  Play,
  ArrowRight,
  Target,
  Trophy,
  Filter,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AvatarStack } from '../components/AvatarStack';
import { RoutineModal } from '../components/RoutineModal';
import { INITIAL_EVENT_LOGS } from '../data/initialData';
import { XP_REWARDS, calculateLevel } from '../utils/gamification';

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
    addXp,
    user,
    mobileSection = 'home',
    setMobileSection,
    startFocusSession
  } = useApp();

  const [activeMenuRoutine, setActiveMenuRoutine] = useState(null);
  const [activeMenuTask, setActiveMenuTask] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [taskMenuPosition, setTaskMenuPosition] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const [editingRoutine, setEditingRoutine] = useState(null);
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('all'); // 'all', 'in-progress', 'pending', 'completed'
  const [activeRoutineSegment, setActiveRoutineSegment] = useState('task-box');
  const [isWeekView, setIsWeekView] = useState(true); // Point 4: Compact week view toggle
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

  // Close menus on outside click or scroll
  useEffect(() => {
    const handleClose = () => {
      setActiveMenuRoutine(null);
      setMenuPosition(null);
      setActiveMenuTask(null);
      setTaskMenuPosition(null);
    };
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, []);

  const handleOpenRoutineMenu = (e, routine) => {
    e.stopPropagation();
    if (activeMenuRoutine?.id === routine.id) {
      setActiveMenuRoutine(null);
      setMenuPosition(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 185;
    const menuHeight = 175;
    let left = rect.right - menuWidth - 4;
    if (left < 12) left = 12;
    if (left + menuWidth > window.innerWidth - 12) left = window.innerWidth - menuWidth - 12;
    let top = rect.bottom + 6;
    if (top + menuHeight > window.innerHeight - 12 && rect.top > menuHeight + 12) {
      top = rect.top - menuHeight - 6;
    }
    setMenuPosition({ top, left });
    setActiveMenuRoutine(routine);
    setActiveMenuTask(null);
  };

  const handleOpenTaskMenu = (e, task) => {
    e.stopPropagation();
    if (activeMenuTask?.id === task.id) {
      setActiveMenuTask(null);
      setTaskMenuPosition(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 190;
    const menuHeight = 160;
    let left = rect.right - menuWidth;
    if (left < 12) left = 12;
    if (left + menuWidth > window.innerWidth - 12) left = window.innerWidth - menuWidth - 12;
    let top = rect.bottom + 6;
    if (top + menuHeight > window.innerHeight - 12 && rect.top > menuHeight + 12) {
      top = rect.top - menuHeight - 6;
    }
    setTaskMenuPosition({ top, left });
    setActiveMenuTask(task);
    setActiveMenuRoutine(null);
  };

  const selectedPillRef = useRef(null);

  useEffect(() => {
    if (selectedPillRef.current) {
      selectedPillRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [selectedDayNumber, activeMonthIndex, isWeekView]);

  const getRoutineIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={16} className="text-slate-600" />;
      case 'Smile': return <Smile size={16} className="text-slate-600" />;
      case 'Home': return <Home size={16} className="text-slate-600" />;
      case 'Droplet': return <Droplet size={16} className="text-slate-600" />;
      case 'Coffee': return <Coffee size={16} className="text-slate-600" />;
      case 'BookOpen': return <BookOpen size={16} className="text-slate-600" />;
      case 'Sun': return <Sun size={16} className="text-slate-600" />;
      case 'Utensils': return <Utensils size={16} className="text-slate-600" />;
      default: return <Sparkles size={16} className="text-slate-600" />;
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

  // Completion Percentage calculation
  const totalItemsCount = tasks.length;
  const completionPercent = totalItemsCount > 0 ? Math.round((completedTasksCount / totalItemsCount) * 100) : 0;

  // Max streak among habits
  const maxHabitStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak || 0), 4) : 4;
  const levelInfo = calculateLevel(user?.xp || 2850);

  // Next Priority Task (Point 9: Strong visual focus)
  const nextUpTask = tasks.find(t => t.status !== 'completed');

  // Compute 7 days for the compact Week View (Point 4)
  const getWeekDays = () => {
    if (!calendarDays || calendarDays.length === 0) return [];
    const activeIdx = calendarDays.findIndex(d => d.dateNumber === selectedDayNumber);
    const startIdx = Math.max(0, Math.min(calendarDays.length - 7, activeIdx - 3));
    return calendarDays.slice(startIdx, startIdx + 7);
  };

  const daysToRender = isWeekView ? getWeekDays() : calendarDays;

  return (
    <div className="w-full max-w-[1300px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-5 sm:gap-6 min-w-0 max-w-full overflow-x-hidden">
      {/* ===================================================================
          1. COMPACT DATE & CALENDAR CARD (Point 4: Compact Week View)
          =================================================================== */}
      <section className="w-full min-w-0 p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(24,39,75,0.04)] flex flex-col gap-4">
        {/* Month Selector Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Previous Month Button */}
            <button
              onClick={() => setActiveMonthIndex(activeMonthIndex - 1)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shrink-0"
              title="Previous Month"
              type="button"
            >
              <ChevronLeft size={16} strokeWidth={2.4} />
            </button>

            {/* Current Month & Year Display */}
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-400 tracking-wider">
                {activeYear || currentYear}
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                {months[activeMonthIndex]}
              </span>
            </div>

            {/* Next Month Button */}
            <button
              onClick={() => setActiveMonthIndex(activeMonthIndex + 1)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors shrink-0"
              title="Next Month"
              type="button"
            >
              <ChevronRight size={16} strokeWidth={2.4} />
            </button>

            {/* Quick Set to Today Button */}
            <button
              onClick={setToday}
              className={`ml-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                isViewingToday
                  ? 'bg-[#1867FF] text-white shadow-[0_2px_10px_rgba(24,103,255,0.35)]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Jump & Sync to Today's Real Date"
              type="button"
            >
              <CalendarIcon size={12} strokeWidth={2.5} />
              <span>Today</span>
              {isViewingToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          </div>

          {/* Week vs Month View Switcher (Point 4) & Summary */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Compact Week vs Month toggle */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-full border border-slate-200/80 text-[11px] font-bold">
              <button
                onClick={() => setIsWeekView(true)}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  isWeekView
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                type="button"
              >
                Week
              </button>
              <button
                onClick={() => setIsWeekView(false)}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  !isWeekView
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                type="button"
              >
                Month
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#1867FF]">
              <span>{completedTasksCount}/{tasks.length} Done</span>
            </div>
          </div>
        </div>

        {/* Compact Dates Strip (Week: 7 items, Month: scrollable strip) */}
        <div className="pt-2 border-t border-slate-100 w-full min-w-0 overflow-x-auto no-scrollbar py-1">
          <div className={`flex items-center gap-1.5 min-w-0 ${isWeekView ? 'justify-between w-full' : 'justify-start'}`}>
            {daysToRender.map((item, idx) => {
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
                  style={{ minWidth: isWeekView ? '0' : '54px', flex: isWeekView ? 1 : 'none' }}
                  type="button"
                >
                  <span className="date-num text-sm sm:text-base">
                    {item.dateNumber}
                  </span>
                  <span className="date-name text-[10px] sm:text-[11px]">
                    {item.dayName}
                  </span>
                  {item.isToday && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-[#1867FF]'}`} title="Today" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. MOTIVATION & PROGRESS HERO CARD (Points 8 & 9: Strong Visual Focus)
          Visible on Mobile Home and Top of Desktop
          =================================================================== */}
      <section className={`w-full min-w-0 rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden transition-all duration-300 ${
        mobileSection !== 'home' ? 'hidden lg:block' : 'block'
      }`} style={{
        background: 'linear-gradient(135deg, #090E1A 0%, #111B33 60%, #0F275C 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        {/* Glow Accent Circles in Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1867FF]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#38BDF8]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Top Banner Row */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono font-bold tracking-wider text-cyan-300 border border-white/10 uppercase">
                Winter Arc Protocol
              </span>
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                Day {selectedDayNumber} of {months[activeMonthIndex]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/10 flex items-center gap-1.5">
                <Flame size={13} className="text-amber-400 fill-amber-400" />
                <span>{maxHabitStreak} Day Streak</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-emerald-300 border border-white/10 flex items-center gap-1.5">
                <Zap size={13} className="text-emerald-400 fill-emerald-400" />
                <span>+120 XP Today</span>
              </span>
            </div>
          </div>

          {/* Progress Bar & Motivation Headline (Point 8) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>Today's Progress</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#1867FF] text-white">
                    {completionPercent}%
                  </span>
                </h2>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">
                  {completedTasksCount} of {tasks.length} tasks completed • Keep pushing forward
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Lv.{levelInfo.level} • {levelInfo.rank.title}
                </span>
              </div>
            </div>

            {/* Glowing High-Contrast Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-800/80 overflow-hidden border border-white/10 p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1867FF] via-[#38BDF8] to-[#10B981] transition-all duration-700 relative"
                style={{ width: `${Math.max(5, completionPercent)}%` }}
              >
                <div className="absolute inset-0 bg-white/25 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Next Up / Priority Task Banner (Point 9: Strong Visual Focus) */}
          {nextUpTask ? (
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#1867FF] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Clock size={16} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                      Next Priority Task
                    </span>
                    <span className="text-[10px] font-mono text-slate-300">
                      • {nextUpTask.timeLabel || nextUpTask.time}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white truncate">
                    {nextUpTask.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startFocusSession(nextUpTask.title)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Start 25m Focus Session"
                  type="button"
                >
                  <Play size={12} className="fill-slate-900" />
                  <span className="hidden sm:inline">Focus</span>
                </button>
                <button
                  onClick={() => toggleTaskCompleted(nextUpTask.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#1867FF] hover:bg-[#1055E8] text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Mark as Done"
                  type="button"
                >
                  <Check size={14} strokeWidth={3} />
                  <span>Done</span>
                </button>
              </div>
            </div>
          ) : tasks.length > 0 ? (
            /* Celebratory Banner when all tasks are complete (Point 11) */
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎉</span>
                <div>
                  <h3 className="text-sm font-black text-white">All Tasks Completed Today!</h3>
                  <p className="text-xs text-emerald-200">Winter Arc discipline maintained. You earned +150 XP today.</p>
                </div>
              </div>
              <button
                onClick={onOpenJournalModal}
                className="px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
                type="button"
              >
                Log Reflection
              </button>
            </div>
          ) : null}

          {/* Quick Action Chips (Point 12: Quick Actions) */}
          <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={onOpenTaskModal}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              type="button"
            >
              <Plus size={13} strokeWidth={2.6} />
              <span>Quick Task</span>
            </button>

            <button
              onClick={() => {
                setEditingRoutine(null);
                setIsRoutineModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              type="button"
            >
              <Sparkles size={13} />
              <span>Add Routine</span>
            </button>

            <button
              onClick={() => startFocusSession('Winter Arc Deep Work')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              type="button"
            >
              <Play size={12} className="fill-white" />
              <span>25m Focus</span>
            </button>

            <button
              onClick={onOpenJournalModal}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              type="button"
            >
              <BookOpen size={13} />
              <span>Daily Note</span>
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. MAIN RESPONSIVE WORKSPACE (2-COLUMN ON DESKTOP, TABBED ON MOBILE)
          =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-w-0 max-w-full">
        {/* ===================================================================
            COLUMN 1: TODAY'S TASKS TIMELINE (7 COLS ON DESKTOP)
            =================================================================== */}
        <div className={`lg:col-span-7 flex flex-col gap-5 min-w-0 max-w-full ${
          mobileSection !== 'home' ? 'hidden lg:flex' : 'flex'
        }`}>
          <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(24,39,75,0.04)] flex flex-col min-w-0">
            {/* Header: Title & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 min-w-0">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Today's Schedule
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {months[activeMonthIndex]} {selectedDayNumber}, {currentYear} • Focus Timeline
                </span>
              </div>

              {/* Clear Filter Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200/70 text-xs overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveFilterTab('all')}
                  className={`px-3 py-1 rounded-full transition-all whitespace-nowrap ${
                    activeFilterTab === 'all'
                      ? 'bg-white text-slate-900 border border-slate-200 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                  type="button"
                >
                  All ({tasks.length})
                </button>

                <button
                  onClick={() => setActiveFilterTab('in-progress')}
                  className={`px-3 py-1 rounded-full transition-all whitespace-nowrap ${
                    activeFilterTab === 'in-progress'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                  type="button"
                >
                  In Progress ({inProgressCount})
                </button>

                <button
                  onClick={() => setActiveFilterTab('pending')}
                  className={`px-3 py-1 rounded-full transition-all whitespace-nowrap ${
                    activeFilterTab === 'pending'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                  type="button"
                >
                  Pending ({pendingCount})
                </button>

                <button
                  onClick={() => setActiveFilterTab('completed')}
                  className={`px-3 py-1 rounded-full transition-all whitespace-nowrap ${
                    activeFilterTab === 'completed'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200/80 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                  type="button"
                >
                  Done ({completedTasksCount})
                </button>
              </div>
            </div>

            {/* Empty States (Point 11) */}
            {filteredTasks.length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <Check size={22} />
                </div>
                {tasks.length === 0 ? (
                  <>
                    <p className="text-sm font-bold text-slate-800">No tasks for today</p>
                    <p className="text-xs text-slate-400 mt-1">Plan your high-impact schedule to start your day</p>
                    <button
                      onClick={onOpenTaskModal}
                      className="mt-4 btn-primary-blue text-xs py-2 px-4"
                      type="button"
                    >
                      <Plus size={15} />
                      <span>Create First Task</span>
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold text-slate-800">No tasks match "{activeFilterTab}"</p>
                    <button
                      onClick={() => setActiveFilterTab('all')}
                      className="mt-3 text-xs font-bold text-[#1867FF] hover:underline"
                      type="button"
                    >
                      View All Tasks
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Connected Vertical Timeline (Points 6 & 7: Refined Card Hierarchy & Safe Menu) */}
            {filteredTasks.length > 0 && (
              <div className="relative mt-5 flex flex-col gap-3.5 min-w-0">
                <div className="timeline-dashed-line" />

                {filteredTasks.map((task) => {
                  const isDone = task.status === 'completed';

                  return (
                    <div key={task.id} className="relative flex items-start gap-3 sm:gap-4 z-10 group min-w-0">
                      {/* Left: Time Node Badge */}
                      <div className="w-14 sm:w-16 pt-3 flex flex-col items-start shrink-0">
                        <span className="text-[11px] sm:text-xs font-bold text-slate-500 font-mono tracking-tight whitespace-nowrap bg-white pr-1">
                          {task.timeLabel || task.time}
                        </span>
                      </div>

                      {/* Right: Refined White Task Card (Points 6 & 7) */}
                      <div
                        className={`flex-1 p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md hover:border-slate-300 transition-all min-w-0 ${
                          isDone ? 'bg-slate-50/70 opacity-80' : ''
                        }`}
                      >
                        {/* Primary Row: Checkbox + Title + Status + 3-dots Menu */}
                        <div className="flex items-center justify-between gap-2.5 min-w-0">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            {/* Checkbox */}
                            <button
                              onClick={() => toggleTaskCompleted(task.id)}
                              className={`task-tick-btn ${isDone ? 'checked' : ''}`}
                              title={isDone ? 'Mark incomplete' : 'Mark completed'}
                              type="button"
                            >
                              <Check size={15} strokeWidth={3} />
                            </button>

                            {/* Task Title & Time Badge */}
                            <div
                              className="flex flex-col min-w-0 cursor-pointer flex-1"
                              onClick={() => toggleTaskCompleted(task.id)}
                            >
                              <span
                                className={`text-sm sm:text-base font-bold tracking-tight truncate ${
                                  isDone ? 'line-through text-slate-400' : 'text-slate-900'
                                }`}
                              >
                                {task.title}
                              </span>
                            </div>
                          </div>

                          {/* Right: Status Badge & 3-dots Menu */}
                          <div className="flex items-center gap-2 shrink-0">
                            {task.statusBadge === 'Pending' ? (
                              <span className="badge-pending hidden sm:inline-flex">Pending</span>
                            ) : isDone ? (
                              <span className="badge-completed hidden sm:inline-flex">Done ✓</span>
                            ) : (
                              <span className="badge-in-progress hidden sm:inline-flex">In Progress</span>
                            )}

                            {/* 3-dots Task Options Button (Safe, replaces dangerous delete icon - Point 7) */}
                            <button
                              onClick={(e) => handleOpenTaskMenu(e, task)}
                              className={`p-1.5 rounded-lg transition-all border-none ${
                                activeMenuTask?.id === task.id
                                  ? 'bg-slate-200 text-slate-900 ring-2 ring-[#1867FF]/25 shadow-xs'
                                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                              }`}
                              title="Task actions"
                              type="button"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Secondary Details: Description snippet & avatars (Point 6) */}
                        {(task.description || task.members?.length > 0) && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 min-w-0">
                            {task.description ? (
                              <p className="text-xs text-slate-500 line-clamp-1 flex-1">
                                {task.description}
                              </p>
                            ) : (
                              <div />
                            )}

                            <div className="shrink-0 flex items-center gap-2">
                              {/* Mobile Status badge if hidden above */}
                              <span className="sm:hidden text-[10px] font-bold text-slate-500">
                                {task.statusBadge || (isDone ? 'Done' : 'Active')}
                              </span>

                              {task.members?.length > 0 && (
                                <AvatarStack
                                  members={task.members}
                                  extraCount={task.joinedExtra || 1}
                                  size={22}
                                />
                              )}
                            </div>
                          </div>
                        )}
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
            On Mobile, controlled by bottom nav / mobileSection
            =================================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-6 min-w-0 max-w-full">
          {/* ===================================================================
              CARD 1: ROUTINE TASK BOX
              =================================================================== */}
          <div className={`p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] flex flex-col min-w-0 ${
            mobileSection !== 'routines' ? 'hidden lg:flex' : 'flex'
          }`}>
            {/* Segmented Switcher (Add Routine | Routine Box) */}
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

            {/* Checklist Items */}
            <div className="mt-3 flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1">
              {routines.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleRoutine(item.id)}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs flex items-center justify-between cursor-pointer transition-all duration-200 relative min-w-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
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

                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-xs sm:text-sm font-semibold tracking-tight truncate ${
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

                  {/* Right Actions: Checkbox & 3-dots */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRoutine(item.id);
                      }}
                      className={`routine-tick-btn ${item.isCompleted ? 'checked' : ''}`}
                      title={item.isCompleted ? 'Mark incomplete' : 'Mark completed'}
                      type="button"
                    >
                      <Check size={14} strokeWidth={3} />
                    </button>

                    <button
                      onClick={(e) => handleOpenRoutineMenu(e, item)}
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
              CARD 2: SCHEDULED EVENTS & TRIPS
              =================================================================== */}
          <div className={`p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] flex flex-col min-w-0 ${
            mobileSection !== 'events' ? 'hidden lg:flex' : 'flex'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Scheduled Events & Trips
                </h3>
                <span className="text-xs text-slate-500">
                  {months[activeMonthIndex]} Highlights
                </span>
              </div>
              <span className="text-xs font-bold text-[#1867FF] bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                Upcoming
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {INITIAL_EVENT_LOGS.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-[0_2px_8px_rgba(15,23,42,0.02)] flex flex-col gap-2.5 transition-all min-w-0"
                >
                  <div className="flex items-start justify-between min-w-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#1867FF]">
                          {event.dayLabel} {event.dateNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {event.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        {event.description}
                      </p>
                    </div>

                    <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 text-[#1867FF] font-bold text-xs flex items-center justify-center shrink-0">
                      {event.badgeNumber}
                    </div>
                  </div>

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
          <div className={`p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.03)] flex flex-col min-w-0 ${
            mobileSection !== 'habits' ? 'hidden lg:flex' : 'flex'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-amber-500 fill-amber-500" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Winter Arc Habit Streaks
                </h3>
              </div>
              <button
                onClick={onOpenJournalModal}
                className="text-xs font-bold text-[#1867FF] hover:underline"
                type="button"
              >
                Log Reflection
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  onClick={() => toggleHabitToday(habit.id)}
                  className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 flex items-center justify-between cursor-pointer transition-all min-w-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleHabitToday(habit.id);
                      }}
                      className={`habit-tick-btn ${habit.completedToday ? 'checked' : ''}`}
                      title={habit.completedToday ? 'Habit completed today' : 'Click to complete habit'}
                      type="button"
                    >
                      <Check size={14} strokeWidth={3} />
                    </button>
                    <span className={`text-xs font-bold truncate ${habit.completedToday ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {habit.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full shrink-0">
                    <Flame size={12} className="text-amber-500 fill-amber-500" />
                    <span>{habit.streak}d streak</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          FLOATING ACTION BUTTON & QUICK ACTION SPEED DIAL (Point 10 & 12)
          Properly positioned above Safari UI safe-area and mobile bottom nav!
          =================================================================== */}
      <div
        className="fixed z-40 transition-all duration-200 flex flex-col items-end gap-2"
        style={{
          bottom: 'calc(76px + env(safe-area-inset-bottom, 12px))',
          right: '16px'
        }}
      >
        {/* Speed Dial Menu Items */}
        {isSpeedDialOpen && (
          <div className="flex flex-col items-end gap-2 animate-in slide-in-from-bottom-3 duration-150 mb-1">
            <button
              onClick={() => {
                setIsSpeedDialOpen(false);
                startFocusSession('Winter Arc Deep Work');
              }}
              className="px-3.5 py-2 rounded-full bg-white text-slate-900 border border-slate-200 shadow-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"
              type="button"
            >
              <span>25m Focus Session</span>
              <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <Play size={11} className="fill-amber-600" />
              </div>
            </button>

            <button
              onClick={() => {
                setIsSpeedDialOpen(false);
                onOpenJournalModal();
              }}
              className="px-3.5 py-2 rounded-full bg-white text-slate-900 border border-slate-200 shadow-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"
              type="button"
            >
              <span>Daily Reflection</span>
              <div className="w-6 h-6 rounded-full bg-blue-50 text-[#1867FF] flex items-center justify-center">
                <BookOpen size={12} />
              </div>
            </button>

            <button
              onClick={() => {
                setIsSpeedDialOpen(false);
                setEditingRoutine(null);
                setIsRoutineModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-full bg-white text-slate-900 border border-slate-200 shadow-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"
              type="button"
            >
              <span>Add Routine</span>
              <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles size={12} />
              </div>
            </button>
          </div>
        )}

        {/* Primary Floating '+' Button */}
        <button
          onClick={() => {
            if (isSpeedDialOpen) {
              setIsSpeedDialOpen(false);
            } else {
              onOpenTaskModal();
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsSpeedDialOpen(!isSpeedDialOpen);
          }}
          className={`w-14 h-14 rounded-full bg-[#1867FF] text-white shadow-[0_8px_24px_rgba(24,103,255,0.42)] hover:bg-[#1055E8] hover:scale-105 active:scale-95 flex items-center justify-center transition-all border-none cursor-pointer ${
            isSpeedDialOpen ? 'rotate-45 bg-slate-900 hover:bg-slate-800' : ''
          }`}
          title="Add new task (long-press for quick actions)"
          type="button"
        >
          <Plus size={26} strokeWidth={2.8} />
        </button>
      </div>

      {/* Routine 3-dots Dropdown Menu */}
      {activeMenuRoutine && menuPosition && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          <div
            className="fixed inset-0 bg-transparent"
            onClick={() => {
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

      {/* Task 3-dots Dropdown Menu (Safe, Confirmation Required - Point 7) */}
      {activeMenuTask && taskMenuPosition && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          <div
            className="fixed inset-0 bg-transparent"
            onClick={() => {
              setActiveMenuTask(null);
              setTaskMenuPosition(null);
              setDeletingTaskId(null);
            }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: `${taskMenuPosition.top}px`,
              left: `${taskMenuPosition.left}px`,
              width: '190px'
            }}
            className="routine-actions-menu animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-0.5 select-none"
          >
            <button
              onClick={() => {
                toggleTaskCompleted(activeMenuTask.id);
                setActiveMenuTask(null);
                setTaskMenuPosition(null);
              }}
              className="routine-actions-item"
              type="button"
            >
              {activeMenuTask.status === 'completed' ? (
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
                startFocusSession(activeMenuTask.title);
                setActiveMenuTask(null);
                setTaskMenuPosition(null);
              }}
              className="routine-actions-item"
              type="button"
            >
              <Play size={14} className="text-[#1867FF] fill-[#1867FF] shrink-0" />
              <span>Start 25m Focus</span>
            </button>

            <div className="h-px bg-slate-100 my-1" />

            {deletingTaskId === activeMenuTask.id ? (
              <div className="p-1 flex flex-col gap-1">
                <span className="text-[11px] font-bold text-rose-600 px-2">Confirm Delete?</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      deleteTask(activeMenuTask.id);
                      setActiveMenuTask(null);
                      setTaskMenuPosition(null);
                      setDeletingTaskId(null);
                      showToast('Task removed from schedule');
                    }}
                    className="flex-1 py-1 rounded-md bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-colors"
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeletingTaskId(null)}
                    className="flex-1 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold hover:bg-slate-200 transition-colors"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setDeletingTaskId(activeMenuTask.id)}
                className="routine-actions-item danger"
                type="button"
              >
                <Trash2 size={15} className="shrink-0" />
                <span>Delete Task</span>
              </button>
            )}
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
