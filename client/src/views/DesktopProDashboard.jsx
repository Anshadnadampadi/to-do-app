import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Search,
  ExternalLink,
  BookOpen,
  Trophy,
  ArrowUpRight,
  Filter,
  Check,
  Bot,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AvatarStack } from '../components/AvatarStack';
import { StripedProgressBar } from '../components/StripedProgressBar';
import { SparkleStar } from '../components/SparkleStar';
import { CATEGORIES } from '../data/initialData';

export const DesktopProDashboard = ({ onOpenTaskModal, onOpenJournalModal }) => {
  const {
    user,
    tasks,
    toggleTaskCompleted,
    updateTaskProgress,
    habits,
    toggleHabitToday,
    goals,
    toggleMilestone,
    dsa,
    aiTopics,
    projects,
    journals,
    achievements,
    calendarDays,
    selectedDayNumber,
    selectDay,
    setToday,
    isViewingToday,
    months,
    activeMonthIndex,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    triggerCelebration
  } = useApp();

  const [desktopTab, setDesktopTab] = useState('tasks'); // 'tasks' | 'timeline' | 'habits' | 'dsa-ai' | 'goals' | 'journal'

  const heroTask = tasks.find(t => t.isHero) || tasks[0];

  const filteredTasks = tasks.filter(task => {
    const matchesCat = selectedCategory === 'All' || task.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const taskCompletionRate = Math.round((completedTasks.length / tasks.length) * 100) || 0;

  return (
    <div className="w-full max-w-[1500px] mx-auto px-6 py-6 flex flex-col gap-6">
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#141724] via-[#10121a] to-[#0c0e15] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <div className="relative w-16 h-16 rounded-2xl p-[2px] bg-gradient-to-tr from-yellow-400 to-yellow-200 shadow-[0_0_20px_rgba(215,254,3,0.3)]">
            <img
              src={user.avatar || '/assets/maddox_avatar.jpg'}
              alt={user.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">
                Hello, <span className="text-[#d7fe03]">{user.name}</span>
              </h1>
              <SparkleStar size={20} />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {user.todayDateDisplay} • You have <span className="text-white font-semibold">{user.todayMeetingsCount} meetings</span> & {tasks.length} tasks scheduled today
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3 z-10 w-full md:w-auto">
          <button
            onClick={onOpenTaskModal}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-full bg-[#d7fe03] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(215,254,3,0.4)] hover:bg-[#e4ff28] transition-all"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create Task</span>
          </button>

          <button
            onClick={onOpenJournalModal}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
          >
            <BookOpen size={16} />
            <span>Daily Journal</span>
          </button>
        </div>
      </div>

      {/* Metrics Row (from README lines 31-40) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#131622] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Today's Tasks</span>
            <CheckCircle2 size={16} className="text-[#d7fe03]" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white font-mono">
              {completedTasks.length} / {tasks.length}
            </span>
            <div className="mt-2">
              <StripedProgressBar progress={taskCompletionRate} showPercentage={false} height="5px" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#131622] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Current Streak</span>
            <Flame size={16} className="text-[#d7fe03] fill-[#d7fe03]" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white font-mono">{user.streak} Days</span>
            <span className="text-[11px] text-emerald-400 block mt-1">Unbroken Winter Arc</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#131622] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Productivity Score</span>
            <Sparkles size={16} className="text-cyan-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white font-mono">{user.weeklyProductivity}%</span>
            <span className="text-[11px] text-slate-400 block mt-1">Weekly Velocity</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#131622] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>DSA Problems</span>
            <Terminal size={16} className="text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white font-mono">{dsa.totalSolved}</span>
            <span className="text-[11px] text-slate-400 block mt-1">{dsa.easy}E • {dsa.medium}M • {dsa.hard}H</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#131622] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Study Hours</span>
            <Clock size={16} className="text-purple-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white font-mono">{user.totalStudyHours}h</span>
            <span className="text-[11px] text-[#d7fe03] block mt-1">+14h this week</span>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Tasks, Hero Meeting & Schedule Timeline */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Horizontal Calendar Bar */}
          <div className="p-3 rounded-2xl bg-[#131622] border border-white/10 flex items-center justify-between gap-2 overflow-x-auto">
            <button
              onClick={setToday}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                isViewingToday
                  ? 'bg-[#1867FF] text-white shadow-[0_0_12px_rgba(24,103,255,0.4)]'
                  : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
              }`}
              title="Sync & Set to Today's Date"
              type="button"
            >
              <CalendarIcon size={13} />
              <span>Today</span>
              {isViewingToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
            {calendarDays.map((item) => {
              const isSelected = item.dateNumber === selectedDayNumber;
              return (
                <button
                  key={item.dateNumber}
                  onClick={() => selectDay(item.dateNumber)}
                  className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all relative ${
                    isSelected
                      ? 'bg-[#d7fe03] text-black font-extrabold shadow-[0_0_15px_rgba(215,254,3,0.35)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  type="button"
                >
                  <span className="text-xs">{item.dayName}</span>
                  <span className="text-sm font-mono font-black">{item.dateNumber}</span>
                  {item.isToday && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-[#1867FF]'}`} title="Today" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hero Meeting Card matching Screenshot */}
          {heroTask && (
            <div className="rounded-3xl bg-gradient-to-r from-[#1a1e2d] to-[#12141d] border border-white/15 p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#d7fe03]">
                    <CalendarIcon size={14} />
                    <span>{heroTask.date || user?.todayDateDisplay || 'Today'} • {heroTask.time}</span>
                  </div>
                  <h2 className="text-2xl font-black text-white mt-1.5 tracking-tight">
                    {heroTask.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    {heroTask.description}
                  </p>

                  <div className="mt-4 flex items-center gap-6">
                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block mb-1">
                        Joined Members
                      </span>
                      <AvatarStack
                        members={heroTask.members}
                        extraCount={heroTask.joinedExtra || 10}
                        size={28}
                      />
                    </div>

                    <div className="flex-1 max-w-xs">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">Work in Progress</span>
                        <span className="font-mono text-[#d7fe03] font-bold">{heroTask.progress}%</span>
                      </div>
                      <StripedProgressBar
                        progress={heroTask.progress}
                        showPercentage={false}
                        height="8px"
                        interactive={true}
                        onChange={(val) => updateTaskProgress(heroTask.id, val)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/15 shadow-2xl shrink-0 hidden sm:block">
                  <img
                    src={heroTask.image || '/assets/meeting_room_3d.jpg'}
                    alt="Meeting Room 3D"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Task Management & Timeline Tabs */}
          <div className="p-5 rounded-3xl bg-[#12141e] border border-white/10 shadow-xl flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">Tasks & Schedule</h3>
                <span className="text-xs font-mono text-slate-400">({filteredTasks.length})</span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.3)]'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Task Items */}
            <div className="flex flex-col gap-2.5 mt-1">
              {filteredTasks.map((task) => {
                const isDone = task.status === 'completed';

                return (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDone
                        ? 'bg-[#0f1118]/60 border-white/5 opacity-60'
                        : 'bg-[#161925] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleTaskCompleted(task.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                          isDone
                            ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.35)]'
                            : 'border border-white/20 bg-white/5 text-transparent hover:border-yellow-400/50'
                        }`}
                      >
                        <Check size={14} strokeWidth={3} />
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {task.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                            {task.category}
                          </span>
                          {task.priority === 'Urgent' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 font-bold">
                              Urgent
                            </span>
                          )}
                        </div>
                        {task.subtitle && (
                          <p className="text-xs text-slate-400 mt-0.5">{task.subtitle}</p>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar & Actions */}
                    <div className="flex items-center gap-4 sm:w-60">
                      <div className="flex-1">
                        <StripedProgressBar
                          progress={task.progress}
                          showPercentage={true}
                          height="7px"
                          interactive={true}
                          onChange={(val) => updateTaskProgress(task.id, val)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Habits, DSA, AI Topics, Journal */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Daily Habits Consistency Box */}
          <div className="p-5 rounded-3xl bg-[#131622] border border-white/10 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Flame size={18} className="text-[#d7fe03] fill-[#d7fe03]" />
                <h3 className="text-sm font-bold text-white tracking-tight">Daily Habit Streaks</h3>
              </div>
              <span className="text-xs font-mono text-[#d7fe03] font-bold">
                {habits.filter(h => h.completedToday).length}/{habits.length} Done
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  onClick={() => toggleHabitToday(habit.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    habit.completedToday
                      ? 'bg-[#181d2a] border-[#d7fe03]/30'
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        habit.completedToday ? 'bg-[#d7fe03] text-black font-black' : 'border border-white/20'
                      }`}
                    >
                      {habit.completedToday && '✓'}
                    </div>
                    <span className="text-xs font-semibold text-white tracking-tight">
                      {habit.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-yellow-400 font-bold">
                    {habit.streak}d 🔥
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Learning Topics */}
          <div className="p-5 rounded-3xl bg-[#131622] border border-white/10 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Bot size={18} className="text-cyan-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">AI Engineering Roadmap</h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                {aiTopics.filter(t => t.status === 'Completed').length}/{aiTopics.length}
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              {aiTopics.slice(0, 5).map((topic) => (
                <div key={topic.id} className="p-2.5 rounded-xl bg-white/5 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white truncate max-w-[200px]">{topic.name}</span>
                    <span className="text-[10px] font-bold text-slate-300">{topic.status}</span>
                  </div>
                  <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        topic.status === 'Completed' ? 'bg-[#d7fe03]' : 'bg-cyan-400'
                      }`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Journal Reflection */}
          {journals.length > 0 && (
            <div className="p-5 rounded-3xl bg-[#131622] border border-white/10 shadow-xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <BookOpen size={16} className="text-[#d7fe03]" />
                  <h3 className="text-sm font-bold text-white tracking-tight">Latest Journal</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{journals[0].date}</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/30 border border-white/5 text-xs text-slate-300 italic">
                "{journals[0].q2}"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
