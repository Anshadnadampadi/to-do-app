import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  ArrowUpRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Plus,
  Flame,
  ChevronRight,
  MoreVertical,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AvatarStack } from '../components/AvatarStack';
import { StripedProgressBar } from '../components/StripedProgressBar';
import { FloatingDock } from '../components/FloatingDock';

export const ScreenTodayTasks = ({ onNavigateToSchedule, onOpenTaskModal }) => {
  const {
    user,
    tasks,
    toggleTaskCompleted,
    updateTaskProgress,
    selectedFilterPill,
    setSelectedFilterPill,
    searchQuery,
    setSearchQuery,
    activeScreen,
    setActiveScreen
  } = useApp();

  const [isSearchActive, setIsSearchActive] = useState(false);

  // Find the Hero meeting task
  const heroTask = tasks.find(t => t.isHero) || tasks[0];

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (selectedFilterPill) {
      if (selectedFilterPill === 'HRD Meeting') {
        return task.title.toLowerCase().includes('hrd') || task.tags?.includes('HR');
      }
      if (selectedFilterPill === 'Developer Team') {
        return task.category === 'React' || task.category === 'Projects' || task.category === 'AI Engineering';
      }
    }
    if (searchQuery.trim()) {
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return true;
  });

  return (
    <div className="relative flex-1 flex flex-col px-5 pt-1 pb-24 overflow-y-auto select-none bg-gradient-to-b from-[#0f1118] via-[#0a0b10] to-[#07080b]">
      {/* Top App Header */}
      <div className="w-full flex items-center justify-between pt-1 pb-4">
        {/* Left: Menu button */}
        <button
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
          title="Menu"
        >
          <Menu size={18} strokeWidth={2.2} />
        </button>

        {/* Right: Notifications & Profile Avatar */}
        <div className="flex items-center gap-3">
          <button
            className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
            title="Notifications"
          >
            <Bell size={18} strokeWidth={2} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#d7fe03] ring-2 ring-[#0f1118]" />
          </button>

          {/* User Avatar with Yellow status border ring */}
          <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-yellow-200 to-transparent">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
              <img
                src={user.avatar || '/assets/maddox_avatar.jpg'}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#d7fe03] border-2 border-[#0f1118]" />
          </div>
        </div>
      </div>

      {/* Greeting Section */}
      <div className="mt-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
          <span>{user.greetingPrefix || "Hello,"}</span>
          <span className="text-[#d7fe03] underline decoration-yellow-400/40 decoration-wavy decoration-1 underline-offset-4">
            {user.name}
          </span>
        </h1>
        <p className="mt-1 text-xs text-slate-400 font-medium">
          {user?.todayDateDisplay || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • You have <span className="text-white font-semibold">{user.todayMeetingsCount || 0} meetings</span> & {tasks.length} tasks scheduled today
        </p>
      </div>

      {/* Search & Quick Filter Pills */}
      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {/* Search Icon Button or Input */}
        {isSearchActive ? (
          <div className="flex-1 flex items-center bg-[#171a25] border border-white/15 rounded-full px-3 py-1.5">
            <Search size={14} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              autoFocus
            />
            <button
              onClick={() => {
                setIsSearchActive(false);
                setSearchQuery('');
              }}
              className="text-slate-400 hover:text-white text-xs ml-1"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchActive(true)}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 shrink-0 transition-colors"
            title="Search"
          >
            <Search size={16} />
          </button>
        )}

        {/* Pill 1: HRD Meeting */}
        <button
          onClick={() => setSelectedFilterPill(selectedFilterPill === 'HRD Meeting' ? '' : 'HRD Meeting')}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
            selectedFilterPill === 'HRD Meeting'
              ? 'bg-[#d7fe03] text-[#090a0f] shadow-[0_0_12px_rgba(215,254,3,0.35)]'
              : 'bg-white/5 border border-white/10 text-white/85 hover:bg-white/10'
          }`}
        >
          HRD Meeting
        </button>

        {/* Pill 2: Developer Team */}
        <button
          onClick={() => setSelectedFilterPill(selectedFilterPill === 'Developer Team' ? '' : 'Developer Team')}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
            selectedFilterPill === 'Developer Team'
              ? 'bg-[#d7fe03] text-[#090a0f] shadow-[0_0_12px_rgba(215,254,3,0.35)]'
              : 'bg-white/5 border border-white/10 text-white/85 hover:bg-white/10'
          }`}
        >
          Developer Team
        </button>

        {/* Add Task Quick Button */}
        <button
          onClick={onOpenTaskModal}
          className="w-10 h-10 rounded-full bg-[#d7fe03]/15 border border-[#d7fe03]/30 text-[#d7fe03] flex items-center justify-center hover:bg-[#d7fe03]/25 shrink-0 transition-colors"
          title="Add New Task"
        >
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Section: My Task Header */}
      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-white tracking-tight">My Task</h2>
        <button
          onClick={onNavigateToSchedule}
          className="text-xs font-semibold text-[#d7fe03] hover:underline flex items-center gap-0.5"
        >
          <span>See Schedule</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Big Hero Card (Development Sprint Team Meeting) from Design Screenshot */}
      {heroTask && (
        <div className="mt-3 relative rounded-[28px] overflow-hidden bg-gradient-to-b from-[#1b1f2e] via-[#141722] to-[#0e1017] border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.8)] p-5">
          {/* Top Row: Date, Time & Arrow Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                <CalendarIcon size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 font-medium">{heroTask.date || user?.todayDateDisplay || 'Today'}</span>
                <span className="text-xs font-bold text-white tracking-tight">{heroTask.time}</span>
              </div>
            </div>

            {/* Top Right Arrow Button */}
            <button
              onClick={onNavigateToSchedule}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#d7fe03] hover:text-black transition-all duration-200"
              title="Open timeline"
            >
              <ArrowUpRight size={17} strokeWidth={2.4} />
            </button>
          </div>

          {/* Main Title & 3D Meeting Room Visual */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-xl font-extrabold text-white leading-tight tracking-tight">
                {heroTask.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-snug line-clamp-2">
                {heroTask.description}
              </p>
            </div>

            {/* 3D Meeting Room Miniature Render */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/15 shadow-inner bg-black/40 relative group">
              <img
                src={heroTask.image || '/assets/meeting_room_3d.jpg'}
                alt="3D Meeting Room"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Joined Members Avatar Stack */}
          <div className="mt-4">
            <span className="text-[11px] text-slate-400 font-medium block mb-1">
              Joined Members
            </span>
            <AvatarStack
              members={heroTask.members}
              extraCount={heroTask.joinedExtra || 10}
              size={28}
            />
          </div>

          {/* Bottom Progress Bar matching screenshot */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Work in Progress</span>
              <span className="text-sm font-extrabold font-mono text-[#d7fe03]">
                {heroTask.progress}%
              </span>
            </div>

            {/* Striped Yellow/Black Animated Progress Bar */}
            <StripedProgressBar
              progress={heroTask.progress}
              showPercentage={false}
              height="10px"
              interactive={true}
              onChange={(val) => updateTaskProgress(heroTask.id, val)}
            />
          </div>
        </div>
      )}

      {/* Additional Tasks Section */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            All Today Tasks ({filteredTasks.length})
          </span>
          <span className="text-[11px] text-slate-400">Tap checkbox to mark done</span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="py-8 px-4 rounded-2xl bg-[#151824]/60 border border-white/10 text-center flex flex-col items-center">
            <p className="text-xs text-slate-400">No tasks for today. Start fresh and add your first task!</p>
            <button
              onClick={onOpenTaskModal}
              className="mt-3 px-4 py-1.5 rounded-full bg-[#d7fe03] text-black text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
            >
              + Add Task
            </button>
          </div>
        ) : (
          filteredTasks
            .filter(t => !t.isHero)
            .map((task) => {
            const isDone = task.status === 'completed';

            return (
              <div
                key={task.id}
                className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                  isDone
                    ? 'bg-[#12141c]/60 border-white/5 opacity-70'
                    : 'bg-[#151824]/90 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left Checkbox & Title */}
                  <div className="flex items-start gap-2.5 flex-1">
                    <button
                      onClick={() => toggleTaskCompleted(task.id)}
                      className={`w-6 h-6 rounded-lg mt-0.5 flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.4)]'
                          : 'border border-white/20 bg-white/5 hover:border-yellow-400/50 text-transparent'
                      }`}
                    >
                      <Check size={14} strokeWidth={3} />
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-sm font-bold ${
                            isDone ? 'line-through text-slate-400' : 'text-white'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">
                          {task.category}
                        </span>
                        {task.priority === 'Urgent' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-semibold border border-red-500/30">
                            Urgent
                          </span>
                        )}
                      </div>

                      {task.subtitle && (
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {task.subtitle}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {task.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Progress percentage badge */}
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-[#d7fe03]/15 text-[#d7fe03]'
                      }`}
                    >
                      {task.progress}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2.5">
                  <StripedProgressBar
                    progress={task.progress}
                    showPercentage={false}
                    height="6px"
                    interactive={true}
                    onChange={(val) => updateTaskProgress(task.id, val)}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* Floating Bottom Dock */}
      <FloatingDock activeTab={activeScreen} onTabChange={setActiveScreen} />
    </div>
  );
};
