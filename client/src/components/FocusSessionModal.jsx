import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FocusSessionModal = ({ isOpen, onClose, defaultTaskTitle = '' }) => {
  const { addXp, showToast, triggerCelebration } = useApp();

  const [initialMinutes, setInitialMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [taskName, setTaskName] = useState(defaultTaskTitle || 'Deep Work Session');

  useEffect(() => {
    if (defaultTaskTitle) {
      setTaskName(defaultTaskTitle);
    }
  }, [defaultTaskTitle]);

  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
    setIsActive(false);
  }, [initialMinutes, isOpen]);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((sec) => sec - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      setIsActive(false);
      triggerCelebration();
      addXp(50);
      showToast('⚡ +50 XP: Deep Work Focus Session Completed! Outstanding discipline.');
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, addXp, showToast, triggerCelebration]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalSeconds = initialMinutes * 60;
  const progressPercent = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="modal-backdrop-overlay animate-in fade-in duration-200 p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden p-6 flex flex-col items-center gap-5">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1867FF] flex items-center justify-center">
              <Zap size={16} className="fill-[#1867FF]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Focus Session</h2>
              <span className="text-[11px] text-slate-400 font-medium">Winter Arc Deep Work</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
            type="button"
          >
            <X size={15} />
          </button>
        </div>

        {/* Task Focus Input */}
        <div className="w-full">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="What are you focusing on?"
            className="w-full text-center text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200/80 rounded-2xl py-2 px-3 focus:outline-none focus:border-[#1867FF] focus:bg-white transition-all"
          />
        </div>

        {/* Circular Display */}
        <div className="relative w-48 h-48 flex items-center justify-center my-2">
          {/* SVG Ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-slate-100"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-[#1867FF] transition-all duration-300"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Time Center */}
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-black font-mono tracking-tight text-slate-900">
              {timeFormatted}
            </span>
            <span className="text-[11px] font-bold text-[#1867FF] mt-1 flex items-center gap-1">
              <Sparkles size={11} />
              {isActive ? 'In The Flow' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Time Selector Chips */}
        <div className="flex items-center gap-2">
          {[15, 25, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => {
                setInitialMinutes(mins);
                setIsActive(false);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                initialMinutes === mins
                  ? 'bg-[#1867FF] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
              type="button"
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-4 w-full pt-2">
          <button
            onClick={() => {
              setSecondsLeft(initialMinutes * 60);
              setIsActive(false);
            }}
            className="flex-1 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            type="button"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex-1 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-[#1867FF] hover:bg-[#1055E8] text-white'
            }`}
            type="button"
          >
            {isActive ? <Pause size={14} className="fill-white" /> : <Play size={14} className="fill-white" />}
            <span>{isActive ? 'Pause' : 'Start Focus'}</span>
          </button>
        </div>

        {/* Reward Pill */}
        <div className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Zap size={12} className="text-amber-500 fill-amber-500" />
          <span>Earn +50 XP upon completion</span>
        </div>
      </div>
    </div>
  );
};
