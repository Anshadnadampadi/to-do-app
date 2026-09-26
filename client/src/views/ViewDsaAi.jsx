import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Bot,
  Terminal,
  ExternalLink,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Check,
  RotateCw,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ViewDsaAi = () => {
  const { dsa, aiTopics, updateAiTopicStatus, addDsaProblem } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('dsa'); // 'dsa' | 'ai'
  const [showLogModal, setShowLogModal] = useState(false);

  // Form states
  const [probName, setProbName] = useState('');
  const [probPlatform, setProbPlatform] = useState('LeetCode');
  const [probDiff, setProbDiff] = useState('Medium');
  const [probTime, setProbTime] = useState('20m');
  const [probNotes, setProbNotes] = useState('');

  const handleAddProblem = (e) => {
    e.preventDefault();
    if (!probName.trim()) return;

    addDsaProblem({
      name: probName,
      platform: probPlatform,
      difficulty: probDiff,
      timeTaken: probTime,
      notes: probNotes || 'Practiced during Winter Arc focus session'
    });

    setProbName('');
    setProbNotes('');
    setShowLogModal(false);
  };

  const completedAiCount = aiTopics.filter(t => t.status === 'Completed').length;
  const learningAiCount = aiTopics.filter(t => t.status === 'Learning').length;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Header & Sub-Tab Switcher */}
      <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
            Technical Growth Trackers
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            DSA Practice & AI Engineering Roadmap
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track daily algorithm problems and master modern generative AI & agent architectures.
          </p>
        </div>

        {/* Sub-Tab Selector with Bold Black Text */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#EDF4FA] border border-[#DCE9F6]">
          <button
            onClick={() => setActiveSubTab('dsa')}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
              activeSubTab === 'dsa'
                ? 'bg-white text-[#0F172A] border border-[#BAE6FD] shadow-xs'
                : 'text-slate-700 hover:text-black font-bold'
            }`}
          >
            DSA Practice ({dsa.totalSolved})
          </button>

          <button
            onClick={() => setActiveSubTab('ai')}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
              activeSubTab === 'ai'
                ? 'bg-white text-[#0F172A] border border-[#BAE6FD] shadow-xs'
                : 'text-slate-700 hover:text-black font-bold'
            }`}
          >
            AI Roadmap ({completedAiCount}/{aiTopics.length})
          </button>
        </div>
      </div>

      {/* ===================================================================
          1. DSA TRACKER SECTION
          =================================================================== */}
      {activeSubTab === 'dsa' && (
        <div className="flex flex-col gap-6">
          {/* DSA Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_10px_rgba(12,74,110,0.03)] flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-500">Total Solved</span>
              <span className="text-3xl font-black text-slate-900 font-mono mt-1">
                {dsa.totalSolved}
              </span>
              <span className="text-[11px] font-semibold text-[#0284C7] mt-1">
                Target: 500 Problems
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_10px_rgba(12,74,110,0.03)] flex flex-col justify-between">
              <span className="text-xs font-bold text-emerald-700">Easy Problems</span>
              <span className="text-3xl font-black text-emerald-600 font-mono mt-1">
                {dsa.easy}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-1">
                {Math.round((dsa.easy / dsa.totalSolved) * 100)}% of total
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_10px_rgba(12,74,110,0.03)] flex flex-col justify-between">
              <span className="text-xs font-bold text-amber-700">Medium Problems</span>
              <span className="text-3xl font-black text-amber-600 font-mono mt-1">
                {dsa.medium}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-1">
                {Math.round((dsa.medium / dsa.totalSolved) * 100)}% of total
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_10px_rgba(12,74,110,0.03)] flex flex-col justify-between">
              <span className="text-xs font-bold text-rose-700">Hard Problems</span>
              <span className="text-3xl font-black text-rose-600 font-mono mt-1">
                {dsa.hard}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-1">
                {Math.round((dsa.hard / dsa.totalSolved) * 100)}% of total
              </span>
            </div>
          </div>

          {/* Platforms Row & Log Button */}
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Platforms:
              </span>
              {dsa.platforms.map((plat) => (
                <div
                  key={plat.name}
                  className="px-3.5 py-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-xs font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
                  <span>{plat.name}</span>
                  <span className="text-slate-500 font-mono">({plat.count})</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowLogModal(true)}
              className="btn-primary-blue text-xs font-black py-2.5 px-4"
            >
              <Plus size={16} strokeWidth={2.8} />
              <span>Log Solved Problem</span>
            </button>
          </div>

          {/* Recent Problems Table */}
          <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
              Recent Problem Practice Log
            </h3>

            <div className="flex flex-col gap-3">
              {dsa.recentProblems.map((prob) => (
                <div
                  key={prob.id}
                  className="p-4 rounded-2xl bg-white border border-[#DCE9F6] hover:border-[#BAE6FD] shadow-[0_2px_8px_rgba(12,74,110,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center shrink-0">
                      <Code2 size={18} />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{prob.name}</h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            prob.difficulty === 'Easy'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : prob.difficulty === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{prob.notes}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 shrink-0">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                      {prob.platform}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {prob.timeTaken}
                    </span>
                    <span>{prob.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          2. AI ENGINEERING ROADMAP SECTION
          =================================================================== */}
      {activeSubTab === 'ai' && (
        <div className="flex flex-col gap-6">
          {/* AI Progress Overview Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(24,39,75,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Full AI Engineering Curriculum
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                {completedAiCount} of {aiTopics.length} Topics Mastered ({Math.round((completedAiCount / aiTopics.length) * 100)}%)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Click any topic status to cycle: Not Started → Learning → Completed
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                {learningAiCount} In Progress
              </span>
            </div>
          </div>

          {/* 11 Topics Grid strictly from README.md */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiTopics.map((topic, idx) => {
              const isDone = topic.status === 'Completed';
              const isLearning = topic.status === 'Learning';

              const cycleStatus = () => {
                const next = isDone ? 'Not Started' : isLearning ? 'Completed' : 'Learning';
                updateAiTopicStatus(topic.id, next);
              };

              return (
                <div
                  key={topic.id}
                  onClick={cycleStatus}
                  className="p-5 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_2px_10px_rgba(12,74,110,0.03)] hover:shadow-md hover:border-[#0EA5E9]/50 cursor-pointer transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isDone
                            ? 'bg-[#DCFCE7] text-emerald-700'
                            : isLearning
                            ? 'bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isDone ? <Check size={18} strokeWidth={3} /> : <Bot size={18} />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            #{idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0284C7] transition-colors">
                            {topic.name}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill with Bold Black Text */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        cycleStatus();
                      }}
                      className={`text-[11px] font-black px-3 py-1 rounded-full border transition-all shrink-0 ${
                        isDone
                          ? 'bg-[#DCFCE7] text-[#0F172A] border-emerald-300'
                          : isLearning
                          ? 'bg-[#FEF3C7] text-[#0F172A] border-amber-300'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {topic.status}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isDone ? 'bg-emerald-500' : isLearning ? 'bg-gradient-to-r from-[#0EA5E9] to-[#0284C7]' : 'bg-transparent'
                      }`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Log Problem Modal */}
      {showLogModal && (
        <div className="modal-backdrop-overlay">
          <div className="w-full max-w-md bg-white border border-[#DCE9F6] rounded-3xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Log Solved DSA Problem
            </h3>

            <form onSubmit={handleAddProblem} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Problem Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Trapping Rain Water"
                  value={probName}
                  onChange={(e) => setProbName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0EA5E9] rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                  required
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Platform
                  </label>
                  <select
                    value={probPlatform}
                    onChange={(e) => setProbPlatform(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-900 outline-none"
                  >
                    <option value="LeetCode">LeetCode</option>
                    <option value="HackerRank">HackerRank</option>
                    <option value="GeeksForGeeks">GeeksForGeeks</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="CodeChef">CodeChef</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Difficulty
                  </label>
                  <select
                    value={probDiff}
                    onChange={(e) => setProbDiff(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-900 outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Time Taken
                </label>
                <input
                  type="text"
                  placeholder="e.g. 25m"
                  value={probTime}
                  onChange={(e) => setProbTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0EA5E9] rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Algorithm Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Two-pointers, monotonic stack, dynamic programming"
                  value={probNotes}
                  onChange={(e) => setProbNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0EA5E9] rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-none"
                />
              </div>

              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#1867FF] hover:bg-[#1055E8] text-white font-bold text-xs shadow-[0_4px_14px_rgba(24,103,255,0.3)] transition-all cursor-pointer border-none"
                >
                  Save Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
