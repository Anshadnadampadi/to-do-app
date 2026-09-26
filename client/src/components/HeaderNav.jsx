import React from 'react';
import { SparkleStar } from './SparkleStar';
import { LayoutGrid, Smartphone, Monitor, RotateCcw, Plus, Zap, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeaderNav = ({ onOpenTaskModal, onOpenJournalModal }) => {
  const { viewMode, setViewMode, resetAllData } = useApp();

  return (
    <div className="w-full bg-[#08090d] border-b border-white/10 px-4 sm:px-6 lg:px-12 py-2 flex items-center justify-between gap-3 text-xs">
      {/* Left indicator */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
        <span className="font-mono text-slate-400 text-[11px] hidden sm:inline">
          DESIGN: PHENOMENON STUDIO × HAULIX COMMAND SYSTEM
        </span>
        <span className="font-mono text-[#FF7A00] text-[11px] sm:hidden font-bold">
          PHENOMENON STUDIO
        </span>
      </div>

      {/* Center Layout Switcher */}
      <div className="flex items-center p-0.5 rounded-full bg-[#12141d] border border-white/10 shadow-inner">
        <button
          onClick={() => setViewMode('phenomenon')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
            viewMode === 'phenomenon'
              ? 'bg-[#FF7A00] text-white shadow-[0_0_12px_rgba(255,122,0,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Responsive Web & Mobile layout matching phenomenonstudio.com"
        >
          <Zap size={13} />
          <span>Phenomenon Web</span>
        </button>

        <button
          onClick={() => setViewMode('single-phone')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
            viewMode === 'single-phone'
              ? 'bg-[#FF7A00] text-white shadow-[0_0_12px_rgba(255,122,0,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Single mobile viewport test"
        >
          <Smartphone size={13} />
          <span>Mobile Frame</span>
        </button>

        <button
          onClick={() => setViewMode('showcase')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all hidden md:flex ${
            viewMode === 'showcase'
              ? 'bg-[#FF7A00] text-white shadow-[0_0_12px_rgba(255,122,0,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
          title="3 Phones side-by-side"
        >
          <LayoutGrid size={13} />
          <span>Tri-View</span>
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={resetAllData}
          className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          title="Reset to default sample data"
        >
          <RotateCcw size={12} />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
