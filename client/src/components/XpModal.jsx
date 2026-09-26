import React from 'react';
import { Zap, X, Trophy, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateLevel, RANKS, XP_REWARDS } from '../utils/gamification';

export const XpModal = ({ isOpen, onClose }) => {
  const { user } = useApp();

  if (!isOpen) return null;

  const levelInfo = calculateLevel(user?.xp || 2850);

  return (
    <div className="modal-backdrop-layer">
      <div className="relative w-full max-w-xl mx-4 rounded-3xl bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Banner */}
        <div className="relative p-6 sm:p-7 bg-slate-50/80 border-b border-slate-100">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-all shadow-xs cursor-pointer"
            title="Close"
          >
            <X size={16} strokeWidth={2.4} />
          </button>

          <div className="flex items-center gap-4">
            {/* Big Level Badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1867FF] to-[#1055E8] text-white flex flex-col items-center justify-center shadow-[0_6px_20px_rgba(24,103,255,0.35)] shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Level</span>
              <span className="text-2xl font-black leading-none">{levelInfo.level}</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {levelInfo.rank.title}
                </span>
                <span className="text-lg">{levelInfo.rank.icon}</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {levelInfo.rank.desc}
              </p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Zap size={14} className="text-amber-500 fill-amber-500" />
                Level {levelInfo.level} Progress
              </span>
              <span className="font-mono font-black text-slate-900">
                {levelInfo.currentLevelProgress} <span className="text-slate-400 font-normal">/</span> {levelInfo.nextLevelXp} XP
                <span className="text-[#1867FF] ml-1.5 font-bold">({levelInfo.progressPercent}%)</span>
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200 p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#1867FF] via-[#38BDF8] to-[#1055E8] rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
              <span>Total XP: <strong className="text-slate-800 font-mono">{levelInfo.totalXp.toLocaleString()} XP</strong></span>
              <span><strong>{levelInfo.xpNeeded} XP</strong> needed for Level {levelInfo.level + 1}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* XP Reward Rates */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#1867FF]" />
              How You Earn XP
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
                <span className="text-[11px] font-bold text-slate-600">Task Complete</span>
                <span className="text-base font-black text-[#1867FF] mt-1">+{XP_REWARDS.TASK_COMPLETE} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
                <span className="text-[11px] font-bold text-slate-600">Daily Habit</span>
                <span className="text-base font-black text-[#1867FF] mt-1">+{XP_REWARDS.HABIT_TODAY} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
                <span className="text-[11px] font-bold text-slate-600">DSA Problem</span>
                <span className="text-base font-black text-[#1867FF] mt-1">+{XP_REWARDS.DSA_PROBLEM} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
                <span className="text-[11px] font-bold text-slate-600">Goal Milestone</span>
                <span className="text-base font-black text-[#1867FF] mt-1">+{XP_REWARDS.GOAL_MILESTONE} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
                <span className="text-[11px] font-bold text-slate-600">AI Topic Done</span>
                <span className="text-base font-black text-[#1867FF] mt-1">+{XP_REWARDS.AI_TOPIC} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
                <span className="text-[11px] font-bold text-slate-600">Daily Journal</span>
                <span className="text-base font-black text-[#1867FF] mt-1">+{XP_REWARDS.JOURNAL_REFLECTION} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
                <span className="text-[11px] font-bold text-slate-600">Routine Check</span>
                <span className="text-base font-black text-[#1867FF] mt-1">+{XP_REWARDS.ROUTINE_COMPLETE} XP</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col">
                <span className="text-[11px] font-bold text-slate-600">Vault Upload</span>
                <span className="text-base font-black text-[#1867FF] mt-1">+{XP_REWARDS.RESOURCE_UPLOAD} XP</span>
              </div>
            </div>
          </div>

          {/* Rank Ladder */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Trophy size={14} className="text-amber-500" />
              Rank Progression Ladder
            </h4>

            <div className="flex flex-col gap-2">
              {RANKS.map((r, idx) => {
                const isCurrent = levelInfo.rank.title === r.title;
                const isUnlocked = levelInfo.level >= r.minLevel;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-blue-50/70 border-[#1867FF] shadow-xs'
                        : isUnlocked
                        ? 'bg-white border-slate-200 opacity-90'
                        : 'bg-slate-50/70 border-slate-100 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{r.icon}</span>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${isCurrent ? 'text-slate-900' : 'text-slate-700'}`}>
                            {r.title}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#0EA5E9] text-white tracking-wider">
                              Current Rank
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">{r.desc}</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-600 shrink-0">
                      Lv. {r.minLevel}+
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Flame size={15} className="text-amber-500" />
            <span>Keep your Winter Arc streak active!</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-[#BAE6FD] hover:bg-[#F0F9FF] text-[#0F172A] font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
