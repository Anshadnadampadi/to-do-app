import React from 'react';
import { ArrowUpRight, Flame, CheckCircle2, Terminal, Clock, Sparkles, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PhenomenonHero = ({ onOpenTaskModal, onOpenJournalModal }) => {
  const { user, tasks, dsa, habits } = useApp();

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const activeHabitsToday = habits.filter(h => h.completedToday).length;

  return (
    <section className="relative w-full pt-8 pb-14 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-white/10">
      {/* Top Badge: Red Dot Winner / Clutch 5.0 Agency Style */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-300">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
          <span>Productivity Command Center</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-bold text-[#FF7A00]">
          <Award size={13} />
          <span>Red Dot Award Style • 14-Day Iron Streak</span>
        </div>
      </div>

      {/* Main Phenomenon Studio Headline in Bricolage Grotesque */}
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.08]">
          We take daily tasks, habits, and careers <span className="text-[#FF7A00] italic font-serif">to the next level.</span>
        </h1>
        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-400 font-normal leading-relaxed max-w-3xl">
          Centralized productivity command interface for software engineers, designers, and high-performance teams. Built for those who outgrow basic to-do lists and require unified tracking for sprint deliverables, DSA coding, habits, and reflections.
        </p>
      </div>

      {/* Hero CTA Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-3.5">
        <button
          onClick={onOpenTaskModal}
          className="ph-btn ph-btn-orange text-sm px-6 py-3"
        >
          <span>+ Create Task</span>
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </button>

        <a
          href="#timeline-schedule"
          className="ph-btn ph-btn-white text-sm px-6 py-3"
        >
          <span>View Today's Timeline</span>
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </a>

        <button
          onClick={onOpenJournalModal}
          className="ph-btn ph-btn-dark text-sm px-6 py-3"
        >
          <span>Daily Journal</span>
          <Sparkles size={15} className="text-[#FF7A00]" />
        </button>
      </div>

      {/* Phenomenon "IN NUMBERS" Section (Matching line 726 of Phenomenon Studio website) */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">
          Phenomenon × Winter Arc in numbers
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#12141e] border border-white/10 shadow-xl">
          {/* Stat 1: Unbroken Streak */}
          <div className="flex flex-col ph-grid-divider pr-4 last:border-r-0">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono flex items-center gap-1.5">
              <span>{user.streak}d</span>
              <Flame size={20} className="text-[#FF7A00] fill-[#FF7A00]" />
            </span>
            <span className="text-xs text-slate-400 mt-1 font-medium">
              unbroken daily discipline streak
            </span>
          </div>

          {/* Stat 2: Weekly Velocity */}
          <div className="flex flex-col ph-grid-divider pr-4 last:border-r-0">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono flex items-center gap-1.5">
              <span>{user.weeklyProductivity}%</span>
              <Sparkles size={20} className="text-[#d7fe03]" />
            </span>
            <span className="text-xs text-slate-400 mt-1 font-medium">
              weekly sprint productivity velocity
            </span>
          </div>

          {/* Stat 3: DSA Problems Solved */}
          <div className="flex flex-col ph-grid-divider pr-4 last:border-r-0">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono flex items-center gap-1.5">
              <span>{dsa.totalSolved}</span>
              <Terminal size={20} className="text-amber-400" />
            </span>
            <span className="text-xs text-slate-400 mt-1 font-medium">
              algorithmic problems conquered
            </span>
          </div>

          {/* Stat 4: Tasks Completed Today */}
          <div className="flex flex-col pr-4">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono flex items-center gap-1.5">
              <span>{completedTasks.length} / {tasks.length}</span>
              <CheckCircle2 size={20} className="text-emerald-400" />
            </span>
            <span className="text-xs text-slate-400 mt-1 font-medium">
              today's deliverables completed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
