import React from 'react';
import { MoreVertical, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AvatarStack } from '../components/AvatarStack';
import { StripedProgressBar } from '../components/StripedProgressBar';
import { FloatingDock } from '../components/FloatingDock';

export const ScreenWorkToday = ({ onOpenTaskModal }) => {
  const {
    user,
    tasks,
    updateTaskProgress,
    calendarDays,
    selectedDayNumber,
    selectDay,
    activeScreen,
    setActiveScreen
  } = useApp();

  // Timeline hours matching the design ruler
  const timelineHours = ['7.00', '8.00', '9.00', '10.00', '11.00', '12.00'];

  // Active tasks for timeline
  const timelineTasks = tasks;

  return (
    <div className="relative flex-1 flex flex-col px-5 pt-1 pb-24 overflow-y-auto select-none bg-gradient-to-b from-[#11131c] via-[#0b0c12] to-[#07080b]">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-semibold text-slate-400">Today</span>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            {user?.todayDateDisplay || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h1>
        </div>

        {/* 3-dots more menu button */}
        <button
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
          title="More options"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Horizontal Calendar Date Picker from Design Screenshot */}
      <div className="mt-4 p-2 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {calendarDays.map((item) => {
          const isSelected = item.dateNumber === selectedDayNumber;

          return (
            <button
              key={item.dateNumber}
              onClick={() => selectDay(item.dateNumber)}
              className={`flex flex-col items-center justify-center py-2 px-2.5 rounded-2xl transition-all duration-200 min-w-[40px] ${
                isSelected
                  ? 'bg-[#d7fe03] text-[#090a0f] shadow-[0_0_16px_rgba(215,254,3,0.45)] scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`text-[10px] font-semibold ${isSelected ? 'text-[#090a0f]' : 'text-slate-400'}`}>
                {item.dayName}
              </span>
              <span className={`text-sm font-extrabold mt-0.5 ${isSelected ? 'text-[#090a0f]' : 'text-white'}`}>
                {item.dateNumber}
              </span>
            </button>
          );
        })}
      </div>

      {/* Work for Today Section */}
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white tracking-tight">Work for Today</h2>
        <button
          onClick={onOpenTaskModal}
          className="text-xs font-semibold text-[#d7fe03] hover:underline flex items-center gap-1"
        >
          <Plus size={14} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Timeline Container matching screenshot visual */}
      <div className="mt-3 relative rounded-3xl bg-[#131620]/90 border border-white/10 p-4 shadow-2xl overflow-hidden">
        {/* Horizontal Time Ruler: 7.00, 8.00, 9.00, 10.00, 11.00, 12.00 */}
        <div className="relative flex items-center justify-between pb-3 border-b border-white/10 text-[11px] font-mono font-medium text-slate-400 px-1">
          {timelineHours.map((hour, idx) => (
            <span
              key={idx}
              className={hour === '10.00' ? 'text-[#d7fe03] font-bold underline underline-offset-4' : ''}
            >
              {hour}
            </span>
          ))}
        </div>

        {/* Subtle Vertical Grid Lines */}
        <div className="absolute inset-x-4 top-11 bottom-4 flex justify-between pointer-events-none opacity-10">
          {timelineHours.map((_, idx) => (
            <div key={idx} className="w-[1px] h-full bg-white border-dashed" />
          ))}
        </div>

        {/* Timeline Floating Gantt Cards */}
        <div className="relative mt-4 flex flex-col gap-3.5 z-10">
          {timelineTasks.slice(0, 5).map((task, idx) => {
            // Indent or offset visually to replicate the diagonal staggered flow in Screen 3
            const offsetStyles = [
              'ml-1 mr-2',    // 1st: Development
              'ml-10 mr-1',   // 2nd: Dashboard Design
              'ml-6 mr-6',    // 3rd: Wireframes
              'ml-14 mr-0',   // 4th: Portfolio design
              'ml-2 mr-8'
            ];

            return (
              <div
                key={task.id}
                className={`p-3 rounded-2xl bg-gradient-to-r from-[#1c1f2c]/95 to-[#151722]/90 border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-[1.01] ${
                  offsetStyles[idx % offsetStyles.length]
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AvatarStack
                      members={task.members}
                      extraCount={task.joinedExtra || 3}
                      size={24}
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white tracking-tight">
                        {task.title}
                      </span>
                      {task.time && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {task.time}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Percentage Pill Badge matching screenshot */}
                  <div className="px-2.5 py-0.5 rounded-full bg-[#d7fe03] text-[#090a0f] text-[11px] font-black font-mono shadow-[0_0_10px_rgba(215,254,3,0.35)] shrink-0">
                    {task.progress}%
                  </div>
                </div>

                {/* Striped Yellow/Black Progress Bar underneath */}
                <div className="mt-2.5">
                  <StripedProgressBar
                    progress={task.progress}
                    showPercentage={false}
                    height="7px"
                    interactive={true}
                    onChange={(val) => updateTaskProgress(task.id, val)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Dock (Calendar active) */}
      <FloatingDock activeTab="schedule" onTabChange={setActiveScreen} />
    </div>
  );
};
