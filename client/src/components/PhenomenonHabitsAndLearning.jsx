import React, { useState } from 'react';
import {
  Flame,
  Terminal,
  Bot,
  CheckCircle2,
  Trophy,
  ExternalLink,
  BookOpen,
  Plus,
  Star,
  Award,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PhenomenonHabitsAndLearning = ({ onOpenJournalModal }) => {
  const {
    habits,
    toggleHabitToday,
    dsa,
    addDsaProblem,
    aiTopics,
    updateAiTopicStatus,
    goals,
    toggleMilestone,
    journals
  } = useApp();

  const [activeTab, setActiveTab] = useState('habits'); // 'habits' | 'dsa' | 'ai' | 'goals'
  const [showAddDsa, setShowAddDsa] = useState(false);
  const [probName, setProbName] = useState('');
  const [probDiff, setProbDiff] = useState('Medium');

  const completedHabitsCount = habits.filter(h => h.completedToday).length;

  const handleAddDsa = (e) => {
    e.preventDefault();
    if (!probName.trim()) return;
    addDsaProblem({
      name: probName,
      platform: 'LeetCode',
      difficulty: probDiff,
      timeTaken: '20m',
      notes: 'Solved during Winter Arc sprint'
    });
    setProbName('');
    setShowAddDsa(false);
  };

  return (
    <section id="habits-consistency" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 border-b border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF7A00] mb-2 flex items-center gap-1.5">
            <span>03 / DISCIPLINE & GROWTH ENGINES</span>
            <span>•</span>
            <span className="text-slate-400">HABITS, DSA & AI SPECIALIZATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Consistency & Engineering Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Track daily non-negotiables, conquer advanced algorithms, and master the AI engineering stack.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#12141d] border border-white/10 overflow-x-auto no-scrollbar self-start md:self-auto">
          <button
            onClick={() => setActiveTab('habits')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'habits'
                ? 'bg-[#FF7A00] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Habits ({completedHabitsCount}/{habits.length})
          </button>

          <button
            onClick={() => setActiveTab('dsa')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'dsa'
                ? 'bg-[#FF7A00] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DSA ({dsa.totalSolved})
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'ai'
                ? 'bg-[#FF7A00] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Roadmap
          </button>

          <button
            onClick={() => setActiveTab('goals')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'goals'
                ? 'bg-[#FF7A00] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Career Goals
          </button>
        </div>
      </div>

      {/* Tab 1: Habit Tracker */}
      {activeTab === 'habits' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {habits.map((habit) => {
            const isDone = habit.completedToday;

            return (
              <div
                key={habit.id}
                onClick={() => toggleHabitToday(habit.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3 ${
                  isDone
                    ? 'bg-[#141824] border-[#FF7A00]/40 shadow-[0_0_20px_rgba(255,122,0,0.1)]'
                    : 'bg-[#12141d] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-[#FF7A00] text-white shadow-[0_0_12px_rgba(255,122,0,0.4)]'
                          : 'border-2 border-white/20 text-transparent'
                      }`}
                    >
                      ✓
                    </button>
                    <div>
                      <h4 className={`text-sm font-bold ${isDone ? 'text-white' : 'text-slate-300'}`}>
                        {habit.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        {habit.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                    <Flame size={13} className="fill-amber-400 text-amber-400" />
                    {habit.streak}d
                  </span>
                </div>

                {/* 7-day mini dot indicator */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">7-Day Consistency</span>
                  <div className="flex items-center gap-1.5">
                    {habit.history?.map((val, idx) => (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full ${
                          val ? 'bg-[#FF7A00]' : 'bg-white/10'
                        }`}
                        title={val ? "Completed" : "Missed"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: DSA Tracker */}
      {activeTab === 'dsa' && (
        <div className="flex flex-col gap-6">
          {/* Top 3 Difficulty Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#12141d] border border-emerald-500/20 flex flex-col justify-between">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Easy Solved
              </span>
              <span className="text-3xl font-black text-white font-mono mt-2">{dsa.easy}</span>
              <span className="text-[11px] text-slate-400 mt-1">Foundation algorithmic patterns</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#12141d] border border-amber-500/20 flex flex-col justify-between">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Medium Solved
              </span>
              <span className="text-3xl font-black text-white font-mono mt-2">{dsa.medium}</span>
              <span className="text-[11px] text-slate-400 mt-1">Core interview questions & DP</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#12141d] border border-red-500/20 flex flex-col justify-between">
              <span className="text-xs text-red-400 font-bold uppercase tracking-wider">
                Hard Solved
              </span>
              <span className="text-3xl font-black text-white font-mono mt-2">{dsa.hard}</span>
              <span className="text-[11px] text-slate-400 mt-1">Complex graph & tree architectures</span>
            </div>
          </div>

          {/* Quick Problem Log Form Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Recent Problem Solutions ({dsa.recentProblems?.length})
            </h3>
            <button
              onClick={() => setShowAddDsa(!showAddDsa)}
              className="ph-btn ph-btn-dark text-xs"
            >
              <Plus size={14} />
              <span>Log Problem</span>
            </button>
          </div>

          {/* Add Problem Modal / Inline Form */}
          {showAddDsa && (
            <form onSubmit={handleAddDsa} className="p-4 rounded-2xl bg-[#171a26] border border-white/15 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. Valid Parentheses / Alien Dictionary"
                value={probName}
                onChange={(e) => setProbName(e.target.value)}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF7A00]"
                autoFocus
              />
              <select
                value={probDiff}
                onChange={(e) => setProbDiff(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <button type="submit" className="ph-btn ph-btn-orange text-xs">
                Save to Log
              </button>
            </form>
          )}

          {/* Problem Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {dsa.recentProblems?.map((prob) => (
              <div
                key={prob.id}
                className="p-4 rounded-2xl bg-[#12141d] border border-white/10 flex flex-col justify-between gap-2 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{prob.name}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {prob.platform} • {prob.timeTaken} • {prob.date}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </div>

                {prob.notes && (
                  <p className="text-xs text-slate-400 italic bg-black/30 p-2 rounded-xl border border-white/5">
                    "{prob.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: AI Learning Roadmap */}
      {activeTab === 'ai' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiTopics.map((topic) => {
            const isCompleted = topic.status === 'Completed';
            const isLearning = topic.status === 'Learning';

            return (
              <div
                key={topic.id}
                className="p-4 rounded-2xl bg-[#12141d] border border-white/10 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-white tracking-tight">{topic.name}</span>
                    <select
                      value={topic.status}
                      onChange={(e) => updateAiTopicStatus(topic.id, e.target.value)}
                      className="bg-black/50 border border-white/15 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="Learning">Learning</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isCompleted ? 'bg-[#FF7A00]' : isLearning ? 'bg-[#d7fe03]' : 'bg-slate-700'
                      }`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Proficiency: {topic.progress}%</span>
                  <span className={isCompleted ? 'text-[#FF7A00] font-bold' : ''}>
                    {topic.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 4: Career Goals */}
      {activeTab === 'goals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="p-5 rounded-2xl bg-[#12141d] border border-white/10 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold uppercase">
                    {goal.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Target: {goal.targetDate}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{goal.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span>Overall Progress</span>
                  <span className="font-mono text-[#FF7A00] font-bold">{goal.progress}%</span>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF7A00] rounded-full transition-all"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones list */}
              <div className="flex flex-col gap-1.5 pt-3 border-t border-white/5">
                {goal.milestones?.map((m, mIdx) => (
                  <label
                    key={mIdx}
                    onClick={() => toggleMilestone(goal.id, mIdx)}
                    className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={m.done}
                      readOnly
                      className="accent-[#FF7A00] cursor-pointer"
                    />
                    <span className={m.done ? 'line-through text-slate-500' : ''}>
                      {m.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
