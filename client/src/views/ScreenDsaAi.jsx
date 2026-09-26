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
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FloatingDock } from '../components/FloatingDock';

export const ScreenDsaAi = () => {
  const { dsa, aiTopics, updateAiTopicStatus, addDsaProblem, activeScreen, setActiveScreen } = useApp();
  const [tab, setTab] = useState('dsa'); // 'dsa' | 'ai'
  const [showAddModal, setShowAddModal] = useState(false);
  const [probName, setProbName] = useState('');
  const [probPlatform, setProbPlatform] = useState('LeetCode');
  const [probDiff, setProbDiff] = useState('Medium');
  const [probTime, setProbTime] = useState('20m');

  const handleAddProblem = (e) => {
    e.preventDefault();
    if (!probName.trim()) return;
    addDsaProblem({
      name: probName,
      platform: probPlatform,
      difficulty: probDiff,
      timeTaken: probTime,
      notes: 'Practiced during Winter Arc focus session'
    });
    setProbName('');
    setShowAddModal(false);
  };

  return (
    <div className="relative flex-1 flex flex-col px-5 pt-1 pb-24 overflow-y-auto select-none bg-gradient-to-b from-[#11131c] via-[#0b0c12] to-[#07080b]">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-semibold text-slate-400">Technical Growth</span>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
            <span>Learning Trackers</span>
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 rounded-full bg-white/10 flex items-center gap-1">
          <button
            onClick={() => setTab('dsa')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              tab === 'dsa'
                ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DSA ({dsa.totalSolved})
          </button>
          <button
            onClick={() => setTab('ai')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              tab === 'ai'
                ? 'bg-[#d7fe03] text-black shadow-[0_0_10px_rgba(215,254,3,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Roadmap
          </button>
        </div>
      </div>

      {tab === 'dsa' ? (
        <div className="mt-4 flex flex-col gap-4">
          {/* DSA Metric Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-2xl bg-[#171a25] border border-emerald-500/20 flex flex-col">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Easy
              </span>
              <span className="text-xl font-black text-white mt-1 font-mono">{dsa.easy}</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#171a25] border border-amber-500/20 flex flex-col">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                Medium
              </span>
              <span className="text-xl font-black text-white mt-1 font-mono">{dsa.medium}</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#171a25] border border-red-500/20 flex flex-col">
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
                Hard
              </span>
              <span className="text-xl font-black text-white mt-1 font-mono">{dsa.hard}</span>
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-2.5 rounded-2xl bg-white/5 border border-dashed border-white/20 hover:border-[#d7fe03]/60 text-slate-300 hover:text-[#d7fe03] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus size={16} />
            <span>Log Solved Problem</span>
          </button>

          {/* Add Problem Inline Form */}
          {showAddModal && (
            <form onSubmit={handleAddProblem} className="p-3.5 rounded-2xl bg-[#181c28] border border-white/15 flex flex-col gap-2.5">
              <span className="text-xs font-bold text-white">Log Solved Problem</span>
              <input
                type="text"
                placeholder="Problem name e.g. Valid Anagram"
                value={probName}
                onChange={(e) => setProbName(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d7fe03]"
                autoFocus
              />
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={probPlatform}
                  onChange={(e) => setProbPlatform(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white"
                >
                  <option value="LeetCode">LeetCode</option>
                  <option value="GeeksForGeeks">GFG</option>
                  <option value="Codeforces">Codeforces</option>
                </select>
                <select
                  value={probDiff}
                  onChange={(e) => setProbDiff(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <input
                  type="text"
                  placeholder="20m"
                  value={probTime}
                  onChange={(e) => setProbTime(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white text-center"
                />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="submit"
                  className="flex-1 py-1.5 rounded-xl bg-[#d7fe03] text-black font-bold text-xs"
                >
                  Save Problem
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Recent Problems List */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Recent Submissions
            </span>
            {dsa.recentProblems?.map((prob) => (
              <div
                key={prob.id}
                className="p-3 rounded-2xl bg-[#141622] border border-white/10 flex flex-col gap-1.5 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-tight">{prob.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Terminal size={12} />
                    {prob.platform} • {prob.timeTaken}
                  </span>
                  <span>{prob.date}</span>
                </div>
                {prob.notes && (
                  <p className="text-[11px] text-slate-400 italic bg-black/30 p-1.5 rounded-lg mt-0.5">
                    "{prob.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/20 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <Bot size={14} className="text-[#d7fe03]" />
                AI Engineering Specialization
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {aiTopics.filter(t => t.status === 'Completed').length} of {aiTopics.length} core topics mastered
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#d7fe03] text-black font-extrabold font-mono text-xs">
              {Math.round(
                (aiTopics.filter(t => t.status === 'Completed').length / aiTopics.length) * 100
              )}%
            </span>
          </div>

          {/* AI Topics List */}
          <div className="flex flex-col gap-2">
            {aiTopics.map((topic) => {
              const isCompleted = topic.status === 'Completed';
              const isLearning = topic.status === 'Learning';

              return (
                <div
                  key={topic.id}
                  className="p-3 rounded-2xl bg-[#141620] border border-white/10 flex items-center justify-between gap-2"
                >
                  <div className="flex-1">
                    <span className="text-xs font-bold text-white">{topic.name}</span>
                    <div className="w-full bg-black/40 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isCompleted ? 'bg-[#d7fe03]' : isLearning ? 'bg-cyan-400' : 'bg-slate-700'
                        }`}
                        style={{ width: `${topic.progress}%` }}
                      />
                    </div>
                  </div>

                  <select
                    value={topic.status}
                    onChange={(e) => updateAiTopicStatus(topic.id, e.target.value)}
                    className="bg-black/60 border border-white/15 rounded-xl px-2 py-1 text-[11px] text-white focus:outline-none"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Learning">Learning</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <FloatingDock activeTab="dsa-ai" onTabChange={setActiveScreen} />
    </div>
  );
};
