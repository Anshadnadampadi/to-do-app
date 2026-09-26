import React, { useState } from 'react';
import {
  Flame,
  Check,
  Plus,
  Calendar,
  Sparkles,
  Trophy,
  Filter,
  CheckCircle2,
  TrendingUp,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ViewHabits = () => {
  const {
    habits,
    toggleHabitToday,
    addHabit,
    triggerCelebration,
    showToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddHabitModalOpen, setIsAddHabitModalOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Personal');

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const categories = ['All', 'Personal', 'Gym', 'Reading', 'Projects', 'DSA', 'AI Engineering'];

  const filteredHabits = habits.filter(h => {
    if (selectedCategory === 'All') return true;
    return h.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const completedTodayCount = habits.filter(h => h.completedToday).length;
  const completionPercentage = habits.length > 0
    ? Math.round((completedTodayCount / habits.length) * 100)
    : 0;

  const highestStreak = habits.length > 0
    ? Math.max(...habits.map(h => h.streak))
    : 0;

  const totalConsistencyDays = habits.reduce((acc, h) => {
    const activeCount = h.history.filter(Boolean).length;
    return acc + activeCount;
  }, 0);

  const handleCreateHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) {
      showToast('Please enter a habit name', 'error');
      return;
    }
    addHabit({
      name: newHabitName.trim(),
      category: newHabitCategory
    });
    setNewHabitName('');
    setIsAddHabitModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center font-black">
              <Flame size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Habit Tracker & Consistency Streaks
            </h2>
            <span className="text-xs font-bold text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
              {habits.length} Habits
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium ml-0 sm:ml-11.5">
            Build unshakeable daily consistency. Monitor 7-day consistency dots and active streaks.
          </p>
        </div>

        <button
          onClick={() => setIsAddHabitModalOpen(true)}
          className="btn-primary-blue text-xs font-bold px-4 py-2.5 self-stretch md:self-auto shrink-0 shadow-sm"
        >
          <Plus size={16} strokeWidth={2.8} />
          <span>New Daily Habit</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Today's Rate */}
        <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_12px_rgba(12,74,110,0.03)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Today's Completion
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {completionPercentage}%
              </span>
              <span className="text-xs font-bold text-[#0284C7]">
                ({completedTodayCount}/{habits.length})
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] text-[#0EA5E9] border border-[#BAE6FD] flex items-center justify-center">
            <CheckCircle2 size={24} strokeWidth={2.4} />
          </div>
        </div>

        {/* Card 2: Highest Streak */}
        <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_12px_rgba(12,74,110,0.03)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Max Active Streak
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {highestStreak}
              </span>
              <span className="text-xs font-bold text-amber-500">Days Unbroken</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Flame size={24} strokeWidth={2.4} />
          </div>
        </div>

        {/* Card 3: 7-Day Consistency Volume */}
        <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_12px_rgba(12,74,110,0.03)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Weekly Executions
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {totalConsistencyDays}
              </span>
              <span className="text-xs font-bold text-emerald-600">Total Check-ins</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp size={24} strokeWidth={2.4} />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#E0F2FE] to-[#F0F9FF] text-[#0F172A] border border-[#0EA5E9] shadow-xs font-black'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-[#DCE9F6] hover:border-[#BAE6FD]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHabits.map((habit) => {
          const habitWeeklyCompleted = habit.history.filter(Boolean).length;
          const habitRate = Math.round((habitWeeklyCompleted / 7) * 100);

          return (
            <div
              key={habit.id}
              className={`p-5 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between gap-4 ${
                habit.completedToday
                  ? 'border-emerald-200/80 shadow-[0_2px_12px_rgba(16,185,129,0.06)]'
                  : 'border-slate-200/90 shadow-[0_2px_12px_rgba(24,39,75,0.03)]'
              }`}
            >
              {/* Top row: Name & Toggle */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Habit Tick Button */}
                  <button
                    onClick={() => toggleHabitToday(habit.id)}
                    className={`habit-tick-btn shrink-0 mt-0.5 ${habit.completedToday ? 'checked' : ''}`}
                    title={habit.completedToday ? 'Mark incomplete' : 'Mark completed today'}
                    type="button"
                  >
                    <Check
                      size={14}
                      strokeWidth={3.5}
                      className={habit.completedToday ? 'opacity-100' : 'opacity-0'}
                    />
                  </button>

                  <div className="flex flex-col">
                    <span className={`text-sm font-bold leading-snug transition-colors ${
                      habit.completedToday ? 'text-slate-900' : 'text-slate-800'
                    }`}>
                      {habit.name}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {habit.category}
                      </span>
                      <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
                        <Flame size={12} />
                        {habit.streak}d streak
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-slate-900">{habitRate}%</span>
                  <p className="text-[10px] text-slate-400 font-medium">7d rate</p>
                </div>
              </div>

              {/* Bottom row: 7-Day History Dots */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">Past 7 Days:</span>
                <div className="flex items-center gap-1.5">
                  {habit.history.map((done, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">
                        {daysOfWeek[idx]}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                          done
                            ? 'bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-300'
                        }`}
                        title={`${daysOfWeek[idx]}: ${done ? 'Completed' : 'Missed'}`}
                      >
                        {done ? '✓' : '·'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Habit Modal */}
      {isAddHabitModalOpen && (
        <div className="modal-backdrop-overlay">
          <div className="w-full max-w-md bg-white border border-[#DCE9F6] rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-[#0EA5E9]" />
                <h3 className="text-base font-black text-slate-900">Add New Daily Habit</h3>
              </div>
              <button
                onClick={() => setIsAddHabitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreateHabit} className="flex flex-col gap-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Habit Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read 20 pages of System Design"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Category
                </label>
                <select
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 bg-white"
                >
                  <option value="Personal">Personal</option>
                  <option value="Gym">Gym</option>
                  <option value="Reading">Reading</option>
                  <option value="Projects">Projects</option>
                  <option value="DSA">DSA</option>
                  <option value="AI Engineering">AI Engineering</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddHabitModalOpen(false)}
                  className="btn-secondary-white px-4 py-2 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-blue px-4 py-2 text-xs font-bold"
                >
                  <Plus size={15} strokeWidth={2.8} />
                  <span>Create Habit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
