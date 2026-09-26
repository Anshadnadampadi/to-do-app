import {
  TrendingUp,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  Briefcase,
  Target,
  Code2,
  Bot,
  Activity,
  Calendar,
  Sparkles,
  Zap,
  Trophy
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WEEKLY_ANALYTICS_DATA } from '../data/initialData';
import { calculateLevel } from '../utils/gamification';

export const ViewAnalytics = ({ onOpenTaskModal, onOpenJournalModal }) => {
  const { user, tasks, habits, goals, dsa, aiTopics, projects, setIsXpModalOpen } = useApp();
  const levelInfo = calculateLevel(user?.xp || 2850);

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const completedHabits = habits.filter(h => h.completedToday).length;
  const completedAiTopics = aiTopics.filter(t => t.status === 'Completed').length;
  const aiProgressPercent = Math.round((completedAiTopics / aiTopics.length) * 100);

  // Metrics from README.md
  const metrics = [
    {
      title: "Tasks Done Today",
      value: `${completedTasks}/${tasks.length}`,
      sub: `${Math.round((completedTasks / (tasks.length || 1)) * 100)}% completion rate`,
      icon: <CheckCircle2 size={20} className="text-[#0EA5E9]" />,
      bg: "bg-[#F0F9FF]"
    },
    {
      title: "Current Streak",
      value: `${user.streak} Days`,
      sub: "Active Winter Arc focus",
      icon: <Flame size={20} className="text-amber-500" />,
      bg: "bg-[#FEF3C7]"
    },
    {
      title: "Weekly Productivity",
      value: `${user.weeklyProductivity}%`,
      sub: "+4% vs previous week",
      icon: <TrendingUp size={20} className="text-emerald-500" />,
      bg: "bg-[#DCFCE7]"
    },
    {
      title: "Total Study Hours",
      value: `${user.totalStudyHours}h`,
      sub: "Across DSA, AI & Dev",
      icon: <Clock size={20} className="text-purple-500" />,
      bg: "bg-purple-50"
    },
    {
      title: "Active Projects",
      value: `${projects.length}`,
      sub: "Production & side projects",
      icon: <Briefcase size={20} className="text-indigo-500" />,
      bg: "bg-indigo-50"
    },
    {
      title: "Goals Tracked",
      value: `${goals.length}`,
      sub: `${goals.filter(g => g.progress === 100).length} completed`,
      icon: <Target size={20} className="text-rose-500" />,
      bg: "bg-rose-50"
    },
    {
      title: "DSA Solved",
      value: `${dsa.totalSolved}/500`,
      sub: `${dsa.easy} Easy • ${dsa.medium} Med • ${dsa.hard} Hard`,
      icon: <Code2 size={20} className="text-[#0EA5E9]" />,
      bg: "bg-[#F0F9FF]"
    },
    {
      title: "AI Engineering",
      value: `${aiProgressPercent}%`,
      sub: `${completedAiTopics}/${aiTopics.length} roadmap topics`,
      icon: <Bot size={20} className="text-emerald-600" />,
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
            Performance Intelligence
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Centralized Productivity Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time analytics for your Winter Arc consistency, study hours, and milestones.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenJournalModal}
            className="btn-secondary-white text-xs font-black py-2 px-4"
          >
            <Sparkles size={15} className="text-[#0EA5E9]" />
            <span>Daily Reflection</span>
          </button>
          <button
            onClick={onOpenTaskModal}
            className="btn-primary-blue text-xs font-black py-2 px-4"
          >
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Gamification & XP Level Progress Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#E0F2FE] via-[#F0F9FF] to-white border border-[#BAE6FD] shadow-[0_4px_24px_rgba(14,165,233,0.12)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(14,165,233,0.35)] shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Level</span>
            <span className="text-2xl font-black leading-none">{levelInfo.level}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {levelInfo.rank.title}
              </span>
              <span className="text-lg">{levelInfo.rank.icon}</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {levelInfo.rank.desc} • <strong className="text-slate-900 font-mono">{levelInfo.totalXp.toLocaleString()} Total XP</strong>
            </p>
          </div>
        </div>

        {/* Progress Bar & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 max-w-md">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Zap size={13} className="text-amber-500 fill-amber-500" />
                Level {levelInfo.level + 1} Target
              </span>
              <span className="font-mono font-bold text-slate-800">
                {levelInfo.currentLevelProgress} / {levelInfo.nextLevelXp} XP ({levelInfo.progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white border border-[#BAE6FD] overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] rounded-full transition-all duration-700"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setIsXpModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-white hover:bg-[#F0F9FF] border border-[#BAE6FD] text-[#0F172A] font-bold text-xs shadow-xs transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Trophy size={14} className="text-amber-500" />
            <span>XP Ladder</span>
          </button>
        </div>
      </div>

      {/* 8 Metric Cards Grid strictly from README.md */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_12px_rgba(12,74,110,0.03)] hover:shadow-md hover:border-[#BAE6FD] transition-all flex flex-col justify-between gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">{m.title}</span>
              <div className={`w-9 h-9 rounded-xl ${m.bg} flex items-center justify-center shrink-0`}>
                {m.icon}
              </div>
            </div>

            <div>
              <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {m.value}
              </span>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                {m.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Analytics Charts Section strictly from README.md */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Activity Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col justify-between gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Weekly Study Hours & Tasks
              </h3>
              <span className="text-xs text-slate-400">
                Daily output across the current 7-day focus sprint
              </span>
            </div>
            <span className="text-xs font-black text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-1 rounded-full">
              34.5h Total
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="flex items-end justify-between gap-2 pt-6 pb-2 px-2 h-48 border-b border-slate-100">
            {WEEKLY_ANALYTICS_DATA.map((item, idx) => {
              const maxHours = 8;
              const heightPercent = Math.round((item.studyHours / maxHours) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-bold font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.studyHours}h
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[34px] rounded-xl bg-blue-100/80 group-hover:bg-[#1867FF] transition-all relative"
                  />
                  <span className="text-xs font-bold text-slate-700 mt-1">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#1867FF]" />
              Study Hours
            </span>
            <span>Average: 4.9 hours/day</span>
          </div>
        </div>

        {/* Habit & Task Completion Breakdown (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col justify-between gap-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Habit & Category Consistency
            </h3>
            <span className="text-xs text-slate-400">
              Distribution of work across target disciplines
            </span>
          </div>

          <div className="flex flex-col gap-3 py-1">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-800">DSA & Algorithm Practice</span>
                <span className="text-[#0284C7] font-mono">68%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] h-full rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-800">AI Engineering & Agents</span>
                <span className="text-emerald-600 font-mono">{aiProgressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${aiProgressPercent}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-800">React & Next.js Architecture</span>
                <span className="text-indigo-600 font-mono">92%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-800">Daily Routine Checklist</span>
                <span className="text-amber-600 font-mono">
                  {Math.round((completedHabits / habits.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${Math.round((completedHabits / habits.length) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">Monthly Target Pacing:</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              On Track for Q1 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
