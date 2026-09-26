import React, { useState } from 'react';
import {
  Target,
  Briefcase,
  ExternalLink,
  Plus,
  CheckCircle2,
  Calendar,
  Check,
  Trash2,
  FolderGit2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ViewGoalsProjects = () => {
  const { goals, addGoal, deleteGoal, toggleMilestone, projects, addProject, deleteProject } = useApp();
  const [activeTab, setActiveTab] = useState('goals'); // 'goals' | 'projects'
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showProjModal, setShowProjModal] = useState(false);

  // New Goal State
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState('Projects');
  const [goalDate, setGoalDate] = useState('March 2026');
  const [goalMilestones, setGoalMilestones] = useState('');

  // New Project State
  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projCat, setProjCat] = useState('Full Stack');
  const [projGithub, setProjGithub] = useState('');
  const [projLive, setProjLive] = useState('');

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;
    const ms = goalMilestones.split(',').map(s => s.trim()).filter(Boolean);
    addGoal({
      title: goalTitle,
      category: goalCategory,
      targetDate: goalDate,
      milestones: ms.length ? ms : ['Foundation architecture', 'Core implementation', 'Production launch']
    });
    setGoalTitle('');
    setGoalMilestones('');
    setShowGoalModal(false);
  };

  const handleCreateProj = (e) => {
    e.preventDefault();
    if (!projName.trim()) return;
    addProject({
      name: projName,
      description: projDesc || 'Winter Arc engineering deliverable',
      category: projCat,
      githubUrl: projGithub || 'https://github.com/anshad',
      liveUrl: projLive || '#',
      progress: 25,
      techStack: ['React', 'Node.js']
    });
    setProjName('');
    setProjDesc('');
    setShowProjModal(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Banner & Switcher */}
      <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
            Career Milestones & Architecture
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Long-Term Goals & Project Portfolio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track multi-month career milestones and full-stack software deliverables.
          </p>
        </div>

        {/* Tab Switcher with Bold Black Text */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#EDF4FA] border border-[#DCE9F6]">
          <button
            onClick={() => setActiveTab('goals')}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
              activeTab === 'goals'
                ? 'bg-white text-[#0F172A] border border-[#BAE6FD] shadow-xs'
                : 'text-slate-700 hover:text-black font-bold'
            }`}
          >
            Career Goals ({goals.length})
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
              activeTab === 'projects'
                ? 'bg-white text-[#0F172A] border border-[#BAE6FD] shadow-xs'
                : 'text-slate-700 hover:text-black font-bold'
            }`}
          >
            Projects ({projects.length})
          </button>
        </div>
      </div>

      {/* ===================================================================
          1. CAREER GOALS VIEW strictly from README.md
          =================================================================== */}
      {activeTab === 'goals' && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Active Long-Term Milestones
            </h3>

            <button
              onClick={() => setShowGoalModal(true)}
              className="btn-primary-blue text-xs font-black py-2 px-4"
            >
              <Plus size={16} strokeWidth={2.8} />
              <span>New Career Goal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {goals.map((goal) => {
              const isDone = goal.progress === 100;

              return (
                <div
                  key={goal.id}
                  className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_3px_14px_rgba(12,74,110,0.03)] hover:shadow-md hover:border-[#BAE6FD] transition-all flex flex-col justify-between gap-4 group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
                          {goal.category}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-2">
                          {goal.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full">
                          {goal.progress}%
                        </span>
                        <button
                          onClick={() => deleteGoal(goal.id)}
                          className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                          title="Delete goal"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#0EA5E9] to-[#0284C7]'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>

                    {/* Milestones Checklist */}
                    <div className="mt-4 flex flex-col gap-2">
                      <span className="text-xs font-bold text-slate-500">Milestones:</span>
                      {goal.milestones.map((ms, idx) => (
                        <div
                          key={idx}
                          onClick={() => toggleMilestone(goal.id, idx)}
                          className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-all ${
                            ms.done
                              ? 'bg-blue-50/50 hover:bg-blue-50/80 border border-blue-100/60'
                              : 'bg-slate-50/70 hover:bg-slate-100/80 border border-transparent'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMilestone(goal.id, idx);
                            }}
                            className={`milestone-check-btn ${ms.done ? 'checked' : ''}`}
                            title={ms.done ? 'Milestone completed (click to undo)' : 'Click to complete milestone'}
                            aria-label={ms.done ? 'Milestone completed' : 'Milestone pending'}
                          >
                            {ms.done && <Check size={13} strokeWidth={3.5} />}
                          </button>
                          <span className={`text-xs ${ms.done ? 'line-through text-slate-400 font-normal' : 'text-slate-800 font-semibold'}`}>
                            {ms.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#0EA5E9]" /> Target: {goal.targetDate}
                    </span>
                    <span className={isDone ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
                      {isDone ? 'Goal Completed ✓' : 'In Progress'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================
          2. PROJECT TRACKER VIEW strictly from README.md
          =================================================================== */}
      {activeTab === 'projects' && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Software Engineering Project Portfolio
            </h3>

            <button
              onClick={() => setShowProjModal(true)}
              className="btn-primary-blue text-xs font-black py-2 px-4"
            >
              <Plus size={16} strokeWidth={2.8} />
              <span>Add Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_3px_14px_rgba(12,74,110,0.03)] hover:shadow-md hover:border-[#BAE6FD] transition-all flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center shrink-0">
                        <FolderGit2 size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{proj.name}</h4>
                        <span className="text-[11px] font-semibold text-slate-400 font-mono">
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {proj.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {proj.techStack?.map((t) => (
                      <span key={t} className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-500">Sprint Progress</span>
                      <span className="text-slate-900 font-mono">{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] h-full rounded-full" style={{ width: `${proj.progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 font-bold text-slate-700 hover:text-black"
                      >
                        <FolderGit2 size={14} /> GitHub
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 font-bold text-[#0284C7] hover:underline"
                      >
                        <ExternalLink size={13} /> Live Preview
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Goal Modal */}
      {showGoalModal && (
        <div className="modal-backdrop-overlay">
          <div className="w-full max-w-md bg-white border border-[#DCE9F6] rounded-3xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Create Long-Term Career Goal
            </h3>

            <form onSubmit={handleCreateGoal} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Master AI System Design"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0EA5E9] rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                  required
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={goalCategory}
                    onChange={(e) => setGoalCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Target Date
                  </label>
                  <input
                    type="text"
                    value={goalDate}
                    onChange={(e) => setGoalDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Milestones (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Read textbook, Implement project, Pass certification"
                  value={goalMilestones}
                  onChange={(e) => setGoalMilestones(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0EA5E9] rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                />
              </div>

              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#1867FF] hover:bg-[#1055E8] text-white font-bold text-xs shadow-[0_4px_14px_rgba(24,103,255,0.3)] transition-all cursor-pointer border-none"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showProjModal && (
        <div className="modal-backdrop-overlay">
          <div className="w-full max-w-md bg-white border border-[#DCE9F6] rounded-3xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Add New Engineering Project
            </h3>

            <form onSubmit={handleCreateProj} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI Agent Workflow Studio"
                  value={projName}
                  onChange={(e) => setProjName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0EA5E9] rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Key features and technical architecture"
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0EA5E9] rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={projGithub}
                    onChange={(e) => setProjGithub(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={projLive}
                    onChange={(e) => setProjLive(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                  />
                </div>
              </div>

              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowProjModal(false)}
                  className="flex-1 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#1867FF] hover:bg-[#1055E8] text-white font-bold text-xs shadow-[0_4px_14px_rgba(24,103,255,0.3)] transition-all cursor-pointer border-none"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
