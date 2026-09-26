import React from 'react';
import { Award, Flame, CheckCircle2, Trophy, Zap, Star, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FloatingDock } from '../components/FloatingDock';

export const ScreenAchievements = () => {
  const { achievements, user, tasks, habits, dsa, activeScreen, setActiveScreen, triggerCelebration } = useApp();

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="relative flex-1 flex flex-col px-5 pt-1 pb-24 overflow-y-auto select-none bg-gradient-to-b from-[#11131c] via-[#0b0c12] to-[#07080b]">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-semibold text-slate-400">Milestones & Honor</span>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
            <span>Achievements</span>
            <Trophy size={18} className="text-[#d7fe03]" />
          </h1>
        </div>

        <button
          onClick={triggerCelebration}
          className="px-3 py-1 rounded-full bg-[#d7fe03] text-black font-extrabold font-mono text-xs shadow-[0_0_12px_rgba(215,254,3,0.4)] hover:scale-105 transition-transform"
        >
          {unlockedCount}/{achievements.length} Unlocked 🎉
        </button>
      </div>

      {/* Productivity Stats Grid from README lines 31-40 */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-[#161924] border border-white/10 flex flex-col">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            <Flame size={13} className="text-[#d7fe03] fill-[#d7fe03]" />
            <span>Current Streak</span>
          </div>
          <span className="text-2xl font-black text-white mt-1 font-mono">{user.streak} Days</span>
          <span className="text-[10px] text-emerald-400 mt-0.5">Top 5% consistency</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#161924] border border-white/10 flex flex-col">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            <Zap size={13} className="text-cyan-400" />
            <span>Productivity</span>
          </div>
          <span className="text-2xl font-black text-white mt-1 font-mono">{user.weeklyProductivity}%</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Weekly Average</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#161924] border border-white/10 flex flex-col">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Tasks Done</span>
          </div>
          <span className="text-2xl font-black text-white mt-1 font-mono">
            {tasks.filter(t => t.status === 'completed').length} / {tasks.length}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">Today's load</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#161924] border border-white/10 flex flex-col">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
            <Star size={13} className="text-yellow-400" />
            <span>Study Hours</span>
          </div>
          <span className="text-2xl font-black text-white mt-1 font-mono">{user.totalStudyHours}h</span>
          <span className="text-[10px] text-[#d7fe03] mt-0.5">+14h this week</span>
        </div>
      </div>

      {/* Badges List */}
      <div className="mt-5 flex flex-col gap-2.5">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Winter Arc Badges
        </span>

        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              ach.unlocked
                ? 'bg-gradient-to-r from-[#171c2a] to-[#12141c] border-[#d7fe03]/30 shadow-[0_0_15px_rgba(215,254,3,0.08)]'
                : 'bg-[#12141c]/60 border-white/5 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  ach.unlocked
                    ? 'bg-[#d7fe03]/15 text-[#d7fe03] border border-[#d7fe03]/40'
                    : 'bg-white/5 text-slate-500 border border-white/5'
                }`}
              >
                <Award size={20} />
              </div>

              <div>
                <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>{ach.title}</span>
                  {ach.unlocked && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#d7fe03]/20 text-[#d7fe03] font-mono">
                      UNLOCKED
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{ach.desc}</p>
              </div>
            </div>

            <div className="text-right">
              {ach.unlocked ? (
                <span className="text-[10px] text-[#d7fe03] font-mono block">
                  {ach.unlockedAt}
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 font-mono block">
                  {ach.progress || 'Locked'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <FloatingDock activeTab="achievements" onTabChange={setActiveScreen} />
    </div>
  );
};
