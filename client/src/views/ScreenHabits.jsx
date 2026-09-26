import React from 'react';
import { Flame, Check, Plus, Trophy, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FloatingDock } from '../components/FloatingDock';

export const ScreenHabits = () => {
  const { habits, toggleHabitToday, activeScreen, setActiveScreen } = useApp();

  const completedTodayCount = habits.filter(h => h.completedToday).length;
  const completionRate = Math.round((completedTodayCount / habits.length) * 100) || 0;

  return (
    <div className="relative flex-1 flex flex-col px-5 pt-1 pb-24 overflow-y-auto select-none bg-gradient-to-b from-[#11131c] via-[#0b0c12] to-[#07080b]">
      {/* Header */}
      <div className="w-full flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-semibold text-slate-400">Consistency Tracker</span>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
            <span>Daily Habits</span>
            <Flame size={20} className="text-[#d7fe03] fill-[#d7fe03]" />
          </h1>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#d7fe03]/15 border border-[#d7fe03]/30 text-[#d7fe03] font-mono text-xs font-extrabold">
          {completionRate}% Today
        </div>
      </div>

      {/* Habit Overview Card */}
      <div className="mt-4 p-4 rounded-3xl bg-gradient-to-br from-[#1c1f2e] to-[#12141d] border border-white/10 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">Habit Completion</span>
          <span className="text-xs font-mono font-bold text-[#d7fe03]">
            {completedTodayCount} of {habits.length} Complete
          </span>
        </div>

        {/* Mini 7-day indicator */}
        <div className="mt-3 flex items-center justify-between gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-slate-400 font-bold">{day}</span>
              <div
                className={`w-full h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  idx === 3
                    ? 'bg-[#d7fe03] text-black font-extrabold shadow-[0_0_10px_rgba(215,254,3,0.3)]'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                {idx === 3 ? '✓' : '•'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habits List */}
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Habits ({habits.length})
          </span>
          <span className="text-[11px] text-slate-400">Tap circle to complete</span>
        </div>

        {habits.map((habit) => {
          const isDone = habit.completedToday;

          return (
            <div
              key={habit.id}
              onClick={() => toggleHabitToday(habit.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                isDone
                  ? 'bg-[#181d2a] border-[#d7fe03]/30 shadow-[0_0_15px_rgba(215,254,3,0.12)]'
                  : 'bg-[#141620] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isDone
                      ? 'bg-[#d7fe03] text-black shadow-[0_0_12px_rgba(215,254,3,0.45)]'
                      : 'border-2 border-white/20 bg-white/5 text-transparent'
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </button>

                <div>
                  <h3
                    className={`text-sm font-bold tracking-tight ${
                      isDone ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {habit.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      {habit.category}
                    </span>
                    <span className="text-[10px] text-yellow-400/90 flex items-center gap-0.5 font-semibold">
                      <Flame size={11} className="fill-yellow-400 text-yellow-400" />
                      {habit.streak}d streak
                    </span>
                  </div>
                </div>
              </div>

              {/* 7-day mini dot history */}
              <div className="flex items-center gap-1">
                {habit.history?.map((completed, hIdx) => (
                  <div
                    key={hIdx}
                    className={`w-2 h-2 rounded-full ${
                      completed ? 'bg-[#d7fe03]' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <FloatingDock activeTab="habits" onTabChange={setActiveScreen} />
    </div>
  );
};
