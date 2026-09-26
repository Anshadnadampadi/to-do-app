import React, { useState } from 'react';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JournalModal = ({ isOpen, onClose }) => {
  const { addJournalEntry } = useApp();

  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [mood, setMood] = useState('🔥 High Focus');
  const [score, setScore] = useState(9);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addJournalEntry({
      q1,
      q2,
      q3,
      q4,
      mood,
      productivityScore: score
    });
    setQ1('');
    setQ2('');
    setQ3('');
    setQ4('');
    onClose();
  };

  return (
    <div className="modal-backdrop-overlay animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-[#1867FF]" />
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Daily Reflection Journal</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Today's State / Mood
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
              >
                <option value="🔥 High Focus">🔥 High Focus</option>
                <option value="⚡ Productive">⚡ Productive</option>
                <option value="💡 Creative Flow">💡 Creative Flow</option>
                <option value="🧘 Disciplined Calm">🧘 Disciplined Calm</option>
                <option value="🎯 Breakthrough Day">🎯 Breakthrough Day</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Score (1-10): <span className="text-[#1867FF] font-bold font-mono">{score}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full accent-[#1867FF] mt-2 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              1. What did I learn today?
            </label>
            <textarea
              rows="2"
              placeholder="Key concepts, algorithms, architectural insights..."
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              2. What did I build today?
            </label>
            <textarea
              rows="2"
              placeholder="Features implemented, code written, models tested..."
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              3. What challenges did I face?
            </label>
            <textarea
              rows="2"
              placeholder="Bugs, bottlenecks, moments of friction and how you tackled them..."
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              4. What will I do tomorrow?
            </label>
            <textarea
              rows="2"
              placeholder="Tomorrow's top priorities to protect the Winter Arc streak..."
              value={q4}
              onChange={(e) => setQ4(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors border-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-full bg-[#1867FF] hover:bg-[#1055E8] text-white font-bold text-xs shadow-[0_4px_14px_rgba(24,103,255,0.3)] transition-all cursor-pointer border-none"
            >
              Save Reflection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
