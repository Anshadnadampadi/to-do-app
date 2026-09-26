import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Sparkles,
  Calendar,
  Smile,
  X,
  CheckCircle2,
  HelpCircle,
  Code2,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ViewJournal = () => {
  const {
    journals,
    addJournalEntry,
    searchQuery,
    setSearchQuery,
    showToast,
    triggerCelebration
  } = useApp();

  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [formData, setFormData] = useState({
    mood: '🔥 High Focus',
    productivityScore: 9,
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  });

  const moods = [
    '🔥 High Focus',
    '⚡ Productive Flow',
    '💡 Breakthrough',
    '🧘 Calm & Mindful',
    '🌧️ Struggling / Tired'
  ];

  const filteredJournals = journals.filter(j => {
    const q = (localSearch || searchQuery).toLowerCase();
    if (!q) return true;
    return (
      j.date.toLowerCase().includes(q) ||
      (j.q1 && j.q1.toLowerCase().includes(q)) ||
      (j.q2 && j.q2.toLowerCase().includes(q)) ||
      (j.q3 && j.q3.toLowerCase().includes(q)) ||
      (j.q4 && j.q4.toLowerCase().includes(q)) ||
      (j.mood && j.mood.toLowerCase().includes(q))
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.q1.trim() && !formData.q2.trim()) {
      showToast('Please fill in at least one reflection prompt', 'error');
      return;
    }
    addJournalEntry(formData);
    setFormData({
      mood: '🔥 High Focus',
      productivityScore: 9,
      q1: '',
      q2: '',
      q3: '',
      q4: ''
    });
    setIsNewEntryModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center font-black">
              <BookOpen size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Daily Reflection Journal
            </h2>
            <span className="text-xs font-bold text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full">
              {journals.length} Entries
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium ml-0 sm:ml-11.5">
            Record daily learnings, builds, blockers, and tomorrow's goals using the 4-prompt system.
          </p>
        </div>

        <button
          onClick={() => setIsNewEntryModalOpen(true)}
          className="btn-primary-blue text-xs font-bold px-4 py-2.5 self-stretch md:self-auto shrink-0 shadow-sm"
        >
          <Plus size={16} strokeWidth={2.8} />
          <span>New Daily Reflection</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={15} />
          </div>
          <input
            type="text"
            placeholder="Search journal entries by learning, build, challenge, or date..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#DCE9F6] text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 shadow-sm"
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Journal Feed */}
      <div className="flex flex-col gap-5">
        {filteredJournals.length === 0 ? (
          <div className="p-10 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] text-center flex flex-col items-center justify-center gap-3">
            <BookOpen size={36} className="text-slate-300" />
            <h4 className="text-sm font-bold text-slate-700">No journal entries found</h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Start your daily reflection ritual by logging today's learnings, builds, and challenges.
            </p>
            <button
              onClick={() => setIsNewEntryModalOpen(true)}
              className="btn-primary-blue text-xs font-bold px-4 py-2 mt-2"
            >
              <Plus size={14} strokeWidth={2.8} />
              <span>Log First Entry</span>
            </button>
          </div>
        ) : (
          filteredJournals.map((entry) => (
            <div
              key={entry.id}
              className="p-6 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#DCE9F6] shadow-[0_4px_20px_rgba(12,74,110,0.04)] flex flex-col gap-5"
            >
              {/* Card Header: Date, Mood & Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center font-bold text-xs shrink-0">
                    <Calendar size={18} className="text-[#0EA5E9]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{entry.date}</span>
                    <span className="text-[11px] text-slate-400 font-medium">Winter Arc Daily Log</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                    {entry.mood}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] text-xs font-black">
                    <Sparkles size={12} />
                    <span>Score: {entry.productivityScore}/10</span>
                  </div>
                </div>
              </div>

              {/* 4 Prompt Grid strictly from README */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Prompt 1: What did I learn today? */}
                <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#DCE9F6] flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-[#0284C7] uppercase tracking-wide">
                    <BookOpen size={14} />
                    <span>What did I learn today?</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {entry.q1 || 'No notes entered for this section.'}
                  </p>
                </div>

                {/* Prompt 2: What did I build today? */}
                <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#DCE9F6] flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wide">
                    <Code2 size={14} />
                    <span>What did I build today?</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {entry.q2 || 'No builds logged.'}
                  </p>
                </div>

                {/* Prompt 3: What challenges did I face? */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/60 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-500 uppercase tracking-wide">
                    <HelpCircle size={14} />
                    <span>What challenges did I face?</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {entry.q3 || 'None logged.'}
                  </p>
                </div>

                {/* Prompt 4: What will I do tomorrow? */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/60 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-purple-600 uppercase tracking-wide">
                    <Compass size={14} />
                    <span>What will I do tomorrow?</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {entry.q4 || 'No priorities specified.'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Reflection Modal */}
      {isNewEntryModalOpen && (
        <div className="modal-backdrop-overlay">
          <div className="w-full max-w-2xl bg-white border border-[#DCE9F6] rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-[#0EA5E9]" />
                <h3 className="text-base font-black text-slate-900">New Daily Journal Reflection</h3>
              </div>
              <button
                onClick={() => setIsNewEntryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              {/* Mood & Productivity Score Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mood / Mindset
                  </label>
                  <select
                    value={formData.mood}
                    onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 bg-white"
                  >
                    {moods.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Productivity Rating (1 - 10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.productivityScore}
                    onChange={(e) => setFormData({ ...formData, productivityScore: parseInt(e.target.value, 10) })}
                    className="w-full accent-[#0EA5E9] mt-2"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1">
                    <span>1 (Low)</span>
                    <span className="text-[#0284C7] font-black">{formData.productivityScore} / 10</span>
                    <span>10 (Peak)</span>
                  </div>
                </div>
              </div>

              {/* Prompt 1 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  1. What did I learn today?
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Key technical concepts, algorithms, frameworks, or insights..."
                  value={formData.q1}
                  onChange={(e) => setFormData({ ...formData, q1: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20"
                />
              </div>

              {/* Prompt 2 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  2. What did I build today?
                </label>
                <textarea
                  rows={2}
                  placeholder="Features coded, bugs resolved, tests passed, or documents created..."
                  value={formData.q2}
                  onChange={(e) => setFormData({ ...formData, q2: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20"
                />
              </div>

              {/* Prompt 3 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  3. What challenges did I face?
                </label>
                <textarea
                  rows={2}
                  placeholder="Blockers encountered, edge cases, or debugging hurdles..."
                  value={formData.q3}
                  onChange={(e) => setFormData({ ...formData, q3: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20"
                />
              </div>

              {/* Prompt 4 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  4. What will I do tomorrow?
                </label>
                <textarea
                  rows={2}
                  placeholder="Top 3 high-impact priorities for tomorrow..."
                  value={formData.q4}
                  onChange={(e) => setFormData({ ...formData, q4: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewEntryModalOpen(false)}
                  className="btn-secondary-white px-4 py-2 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary-blue px-4 py-2 text-xs font-bold"
                >
                  <Plus size={15} strokeWidth={2.8} />
                  <span>Save Reflection</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
