import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Plus, Sparkles, CheckCircle2, Flame, Layers, BookOpen, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PhenomenonHeader = ({ onOpenTaskModal, onOpenJournalModal }) => {
  const { user, tasks, habits, resetAllData } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090a0f]/95 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo matching Phenomenon Studio */}
        <div className="flex items-center gap-3">
          <a href="#top" className="flex items-center gap-2 text-decoration-none group">
            {/* Phenomenon Star/Spark logo icon */}
            <div className="w-8 h-8 rounded-lg bg-[#141622] border border-white/15 flex items-center justify-center text-[#FF7A00] shadow-[0_0_12px_rgba(255,122,0,0.3)] group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#FF7A00" />
                <circle cx="12" cy="12" r="2" fill="#090a0f" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg text-white tracking-tight leading-none">
                  Phenomenon
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FF7A00]/20 text-[#FF7A00] font-mono font-bold">
                  ARC
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Productivity & Progress Studio
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#command-tasks" className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors">
            <span>Tasks</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-400 font-mono">
              {tasks.length}
            </span>
          </a>

          <a href="#timeline-schedule" className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors">
            <span>Schedule</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange/20 text-[#FF7A00] font-mono">
              May 22
            </span>
          </a>

          <a href="#habits-consistency" className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors">
            <span>Habits</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-400 font-mono">
              {habits.filter(h => h.completedToday).length}/{habits.length}
            </span>
          </a>

          <a href="#dsa-ai-roadmap" className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors">
            <span>DSA & AI</span>
          </a>

          <a href="#journal-reflections" className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors">
            <span>Journal</span>
          </a>
        </nav>

        {/* Right CTA Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Clutch 5.0 Rating Pill from Phenomenon Studio */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
            <span className="text-[#FF7A00] font-bold">5.0</span>
            <span className="text-[11px] text-slate-400">on Clutch • 14d Streak</span>
          </div>

          {/* Create Task Orange Button */}
          <button
            onClick={onOpenTaskModal}
            className="ph-btn ph-btn-orange"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Create Task</span>
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </button>

          {/* User Profile Avatar with Orange Ring */}
          <div className="relative w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-[#FF7A00] via-orange-400 to-transparent shrink-0">
            <img
              src={user.avatar || '/assets/maddox_avatar.jpg'}
              alt={user.name}
              className="w-full h-full object-cover rounded-full bg-slate-800"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#FF7A00] border-2 border-[#090a0f]" />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Phenomenon Mobile Accordion Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#0c0d14] border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Navigation Menu
            </span>
            <span className="text-xs font-mono text-[#FF7A00] font-bold">
              {completedCount} / {tasks.length} Completed
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#command-tasks"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-sm font-bold text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-[#FF7A00]" />
                <span>Task Command Center</span>
              </div>
              <span className="text-xs font-mono text-slate-400">{tasks.length}</span>
            </a>

            <a
              href="#timeline-schedule"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-sm font-bold text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Calendar size={16} className="text-[#d7fe03]" />
                <span>Work for Today (Timeline)</span>
              </div>
              <span className="text-xs font-mono text-[#FF7A00]">May 22</span>
            </a>

            <a
              href="#habits-consistency"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-sm font-bold text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Flame size={16} className="text-amber-400 fill-amber-400" />
                <span>Habits & Streaks</span>
              </div>
              <span className="text-xs font-mono text-slate-400">{habits.length}</span>
            </a>

            <a
              href="#dsa-ai-roadmap"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-sm font-bold text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Layers size={16} className="text-cyan-400" />
                <span>DSA Algorithms & AI Roadmap</span>
              </div>
              <span className="text-xs font-mono text-slate-400">342 Solved</span>
            </a>

            <a
              href="#journal-reflections"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-sm font-bold text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen size={16} className="text-purple-400" />
                <span>Daily Reflection Journal</span>
              </div>
              <span className="text-xs font-mono text-[#FF7A00]">+ Write</span>
            </a>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={() => {
                onOpenJournalModal();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs"
            >
              Log Daily Reflection
            </button>
            <button
              onClick={resetAllData}
              className="px-3 py-2.5 rounded-full bg-white/5 text-slate-400 text-xs"
            >
              Reset Data
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
