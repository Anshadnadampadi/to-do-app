import React from 'react';
import { PhenomenonHero } from '../components/PhenomenonHero';
import { PhenomenonTaskCommand } from '../components/PhenomenonTaskCommand';
import { PhenomenonTimeline } from '../components/PhenomenonTimeline';
import { PhenomenonHabitsAndLearning } from '../components/PhenomenonHabitsAndLearning';
import { PhenomenonJournalAndAchievements } from '../components/PhenomenonJournalAndAchievements';
import { ArrowUpRight } from 'lucide-react';

export const PhenomenonStudioView = ({ onOpenTaskModal, onOpenJournalModal }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <PhenomenonHero
        onOpenTaskModal={onOpenTaskModal}
        onOpenJournalModal={onOpenJournalModal}
      />

      {/* 01: Task Command Center (Haulix Inspired) */}
      <PhenomenonTaskCommand onOpenTaskModal={onOpenTaskModal} />

      {/* 02: Work for Today Schedule & Gantt Timeline */}
      <PhenomenonTimeline onOpenTaskModal={onOpenTaskModal} />

      {/* 03: Consistency & Habits, DSA, AI Roadmap */}
      <PhenomenonHabitsAndLearning onOpenJournalModal={onOpenJournalModal} />

      {/* 04: Journal Reflections & Milestones */}
      <PhenomenonJournalAndAchievements onOpenJournalModal={onOpenJournalModal} />

      {/* Phenomenon Agency Footer */}
      <footer className="w-full bg-[#07080b] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-12 text-slate-400">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display font-black text-xl text-white">Phenomenon Studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF7A00]/20 text-[#FF7A00] font-bold">
                WINTER ARC
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              "We take brands, websites, and products to the next level." Product design & development agency rated 5.0 on Clutch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://phenomenonstudio.com/?utm_source=dribbble&utm_medium=organic_social&utm_campaign=haulix"
              target="_blank"
              rel="noreferrer"
              className="ph-btn ph-btn-dark text-xs"
            >
              <span>Visit Phenomenon Studio</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              onClick={onOpenTaskModal}
              className="ph-btn ph-btn-orange text-xs"
            >
              <span>+ Create Task</span>
            </button>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p className="italic">
            "Small improvements every day create extraordinary results over time." — Winter Arc Philosophy
          </p>
          <p>© 2026 Winter Arc × Phenomenon Studio. Fully responsive for Mobile & Web.</p>
        </div>
      </footer>
    </div>
  );
};
