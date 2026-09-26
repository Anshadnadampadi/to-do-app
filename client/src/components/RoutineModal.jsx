import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Sparkles,
  Smile,
  Home,
  Droplet,
  Coffee,
  BookOpen,
  Sun,
  Utensils,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ROUTINE_ICONS = [
  { name: 'Sparkles', icon: Sparkles, label: 'Sparkle' },
  { name: 'Smile', icon: Smile, label: 'Health' },
  { name: 'Home', icon: Home, label: 'Home' },
  { name: 'Droplet', icon: Droplet, label: 'Water' },
  { name: 'Coffee', icon: Coffee, label: 'Coffee' },
  { name: 'BookOpen', icon: BookOpen, label: 'Study' },
  { name: 'Sun', icon: Sun, label: 'Morning' },
  { name: 'Utensils', icon: Utensils, label: 'Nutrition' }
];

const ROUTINE_CATEGORIES = ['Personal', 'Health', 'Reading', 'Study', 'Nutrition', 'Productivity'];

export const RoutineModal = ({ isOpen, onClose, routineToEdit = null }) => {
  const { addRoutine, editRoutine } = useApp();

  const [title, setTitle] = useState('');
  const [time, setTime] = useState('8:00 AM');
  const [category, setCategory] = useState('Personal');
  const [iconName, setIconName] = useState('Sparkles');

  useEffect(() => {
    if (routineToEdit) {
      setTitle(routineToEdit.title || '');
      setTime(routineToEdit.time || '8:00 AM');
      setCategory(routineToEdit.category || 'Personal');
      setIconName(routineToEdit.iconName || 'Sparkles');
    } else {
      setTitle('');
      setTime('8:00 AM');
      setCategory('Personal');
      setIconName('Sparkles');
    }
  }, [routineToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (routineToEdit) {
      editRoutine(routineToEdit.id, {
        title: title.trim(),
        time,
        category,
        iconName
      });
    } else {
      addRoutine({
        title: title.trim(),
        time,
        category,
        iconName
      });
    }

    onClose();
  };

  return (
    <div className="modal-backdrop-overlay animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden p-6 z-50">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              {routineToEdit ? 'Edit Routine' : 'Add New Routine'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {routineToEdit ? 'Update your daily routine protocol' : 'Create a daily ritual for your Winter Arc checklist'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
            type="button"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Routine Title
            </label>
            <input
              type="text"
              placeholder="e.g. Cold Shower & Hydration"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              required
              autoFocus
            />
          </div>

          {/* Time & Category Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Target Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 7:30 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl pl-8 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-none transition-all"
                  required
                />
                <Clock size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#1867FF] focus:ring-2 focus:ring-[#1867FF]/15 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none transition-all"
              >
                {ROUTINE_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Choose Icon
            </label>
            <div className="grid grid-cols-4 gap-2">
              {ROUTINE_ICONS.map(({ name, icon: IconComponent, label }) => {
                const isSelected = iconName === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setIconName(name)}
                    className={`py-2 px-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#1867FF] text-[#1867FF] ring-2 ring-[#1867FF]/20 shadow-xs'
                        : 'bg-slate-50/80 border-slate-200/80 text-slate-600 hover:bg-slate-100/70'
                    }`}
                  >
                    <IconComponent size={18} />
                    <span className="text-[10px] font-medium leading-none">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-2 flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary-blue text-xs py-2 px-5"
            >
              <Check size={14} strokeWidth={2.6} />
              <span>{routineToEdit ? 'Save Changes' : 'Create Routine'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
