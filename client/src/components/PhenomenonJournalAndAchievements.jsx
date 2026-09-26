import React from 'react';
import { BookOpen, Trophy, Plus, Award, Star, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PhenomenonJournalAndAchievements = ({ onOpenJournalModal }) => {
  const { journals, achievements, triggerCelebration } = useApp();

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <section id="journal-reflections" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
      {/* 2-Column Grid: Left (Daily Reflection Journal) + Right (Achievements & Badges) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Journal History */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF7A00] mb-1 flex items-center gap-1.5">
                <BookOpen size={13} />
                <span>DAILY REFLECTION JOURNAL</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Engineering Logs & Insights
              </h3>
            </div>

            <button
              onClick={onOpenJournalModal}
              className="ph-btn ph-btn-orange text-xs"
            >
              <Plus size={14} />
              <span>Write Reflection</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {journals.map((j) => (
              <div
                key={j.id}
                className="p-5 rounded-2xl bg-[#12141d] border border-white/10 shadow-lg flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white">{j.date}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {j.mood}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FF7A00]">
                    Productivity: {j.productivityScore}/10
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-[10px] text-[#FF7A00] font-bold block mb-1 uppercase tracking-wider">
                      1. Learned Today
                    </span>
                    <p className="text-slate-300 leading-snug">{j.q1}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-[10px] text-[#FF7A00] font-bold block mb-1 uppercase tracking-wider">
                      2. Built Today
                    </span>
                    <p className="text-slate-300 leading-snug">{j.q2}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">
                      3. Challenges Faced
                    </span>
                    <p className="text-slate-300 leading-snug">{j.q3}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">
                      4. Tomorrow's Focus
                    </span>
                    <p className="text-slate-300 leading-snug">{j.q4}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Achievement Badges */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF7A00] mb-1 flex items-center gap-1.5">
                <Trophy size={13} />
                <span>MILESTONES & AWARDS</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Winter Arc Badges
              </h3>
            </div>

            <button
              onClick={triggerCelebration}
              className="px-3 py-1 rounded-full bg-[#FF7A00] text-white font-mono text-xs font-bold shadow-[0_0_12px_rgba(255,122,0,0.4)]"
            >
              {unlockedCount}/{achievements.length} Unlocked 🎉
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  ach.unlocked
                    ? 'bg-[#151824] border-[#FF7A00]/30 shadow-[0_0_15px_rgba(255,122,0,0.08)]'
                    : 'bg-[#10121a]/60 border-white/5 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      ach.unlocked
                        ? 'bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/40'
                        : 'bg-white/5 text-slate-500 border border-white/5'
                    }`}
                  >
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                      <span>{ach.title}</span>
                      {ach.unlocked && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#FF7A00]/20 text-[#FF7A00] font-mono">
                          UNLOCKED
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{ach.desc}</p>
                  </div>
                </div>

                <div className="text-right">
                  {ach.unlocked ? (
                    <span className="text-[10px] text-[#FF7A00] font-mono block">
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
        </div>
      </div>
    </section>
  );
};
