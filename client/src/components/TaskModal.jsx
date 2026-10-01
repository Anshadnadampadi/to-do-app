import React, { useState } from 'react';
import { X, Clock, Plus, Calendar as CalendarIcon, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialData';

export const TaskModal = ({ isOpen, onClose }) => {
  const { addTask } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Projects');
  const [priority, setPriority] = useState('High');
  const [time, setTime] = useState('10:00 AM');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [statusBadge, setStatusBadge] = useState('In Progress');
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderMinutesBefore, setReminderMinutesBefore] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      category,
      priority,
      time,
      timeLabel: time,
      date: date || new Date().toISOString().split('T')[0],
      statusBadge,
      progress: statusBadge === 'Completed' ? 100 : statusBadge === 'In Progress' ? 60 : 20,
      reminder: hasReminder,
      reminderMinutesBefore: hasReminder ? Number(reminderMinutesBefore) : 0
    });

    setTitle('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setHasReminder(false);
    setReminderMinutesBefore(0);
    onClose();
  };

  return (
    <div className="modal-backdrop-overlay animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Create New Task</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Task Title
            </label>
            <input
              type="text"
              placeholder="e.g. Morning gym workout, LeetCode Trees..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Description / Notes
            </label>
            <input
              type="text"
              placeholder="Key deliverable details or subtasks"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl pl-8 pr-2.5 py-2 text-xs text-slate-800 focus:outline-none"
                  required
                />
                <CalendarIcon size={13} className="absolute left-2.5 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="10:00 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none"
                />
                <Clock size={13} className="absolute left-2.5 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Status Badge
            </label>
            <select
              value={statusBadge}
              onChange={(e) => setStatusBadge(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
            >
              <option value="In Progress">In Progress (Mint)</option>
              <option value="Pending">Pending (Amber)</option>
              <option value="Completed">Completed (Blue)</option>
            </select>
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none"
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Reminder Section */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="task-reminder-toggle" className="flex items-center gap-2.5 cursor-pointer select-none">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${hasReminder ? 'bg-purple-600 text-white shadow-xs' : 'bg-purple-100 text-purple-600'}`}>
                  <Bell size={16} className={hasReminder ? 'fill-white' : ''} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Set Reminder</span>
                  <span className="text-[10px] text-slate-500">Audio chime & desktop alert</span>
                </div>
              </label>

              <input
                id="task-reminder-toggle"
                type="checkbox"
                checked={hasReminder}
                onChange={(e) => setHasReminder(e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
              />
            </div>

            {hasReminder && (
              <div className="pt-2 border-t border-purple-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-600">Notify:</span>
                <select
                  value={reminderMinutesBefore}
                  onChange={(e) => setReminderMinutesBefore(Number(e.target.value))}
                  className="bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold focus:outline-none"
                >
                  <option value={0}>At time of task ({time || '10:00 AM'})</option>
                  <option value={5}>5 minutes before</option>
                  <option value={10}>10 minutes before</option>
                  <option value={15}>15 minutes before</option>
                  <option value={30}>30 minutes before</option>
                  <option value={60}>1 hour before</option>
                </select>
              </div>
            )}
          </div>

          {/* Submit buttons */}
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
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
