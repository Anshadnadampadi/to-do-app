import React from 'react';
import { Calendar as CalendarIcon, Clock, Plus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AvatarStack } from './AvatarStack';
import { StripedProgressBar } from './StripedProgressBar';

export const PhenomenonTimeline = ({ onOpenTaskModal }) => {
  const {
    user,
    tasks,
    updateTaskProgress,
    calendarDays,
    selectedDayNumber,
    selectDay
  } = useApp();

  const timelineHours = ['7.00', '8.00', '9.00', '10.00', '11.00', '12.00', '13.00', '14.00'];

  const timelineTasks = tasks.filter(t =>
    ['hero-sprint-meeting', 'task-dev-timeline-1', 'task-dashboard-design', 'task-wireframes', 'task-portfolio-design'].includes(t.id) ||
    t.timeStart !== undefined
  );

  const heroTask = tasks.find(t => t.isHero) || tasks[0];

  return (
    <section id="timeline-schedule" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 border-b border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF7A00] mb-2 flex items-center gap-1.5">
            <span>02 / WORK FOR TODAY</span>
            <span>•</span>
            <span className="text-slate-400">REAL-TIME HOURLY SCRUBBER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Schedule & Gantt Timeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Visual hourly distribution of sprint meetings, architecture design blocks, and coding sessions.
          </p>
        </div>

        {/* Date Display Pill */}
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center gap-2">
            <CalendarIcon size={14} className="text-[#FF7A00]" />
            <span>{user?.todayDateDisplay || 'Today'}</span>
          </div>

          <button
            onClick={onOpenTaskModal}
            className="ph-btn ph-btn-dark text-xs"
          >
            <Plus size={14} />
            <span>Schedule Block</span>
          </button>
        </div>
      </div>

      {/* Horizontal Calendar Date Bar (Interactive Date Picker) */}
      <div className="p-3 rounded-2xl bg-[#12141d] border border-white/10 flex items-center justify-between gap-2 overflow-x-auto mb-8 no-scrollbar">
        {calendarDays.map((item) => {
          const isSelected = item.dateNumber === selectedDayNumber;

          return (
            <button
              key={item.dateNumber}
              onClick={() => selectDay(item.dateNumber)}
              className={`flex-1 min-w-[55px] py-2.5 px-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-[#FF7A00] text-white font-extrabold shadow-[0_0_16px_rgba(255,122,0,0.4)] scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                {item.dayName}
              </span>
              <span className="text-sm sm:text-base font-black font-mono mt-0.5">
                {item.dateNumber}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Schedule Layout: 3D Hero Meeting Card (Left 5 cols) + Gantt Ruler (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Hero Meeting Card with 3D Conference Room */}
        {heroTask && (
          <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-[#181a26] to-[#11131c] border border-white/15 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7A00] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
                  <span>Current Hero Sprint Event</span>
                </span>
                <span className="text-xs font-mono text-slate-400">{heroTask.time}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {heroTask.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {heroTask.description}
              </p>

              {/* 3D Room Render Frame */}
              <div className="mt-5 w-full h-44 rounded-2xl overflow-hidden border border-white/10 relative group bg-black/40">
                <img
                  src={heroTask.image || '/assets/meeting_room_3d.jpg'}
                  alt="3D Meeting Conference Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/70 text-[10px] text-white/90">
                    Live Room
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Progress & Avatars */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1 uppercase font-semibold">
                    Joined Attendees
                  </span>
                  <AvatarStack
                    members={heroTask.members}
                    extraCount={heroTask.joinedExtra || 10}
                    size={28}
                  />
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                    Velocity
                  </span>
                  <span className="text-sm font-black font-mono text-[#FF7A00]">
                    {heroTask.progress}% Complete
                  </span>
                </div>
              </div>

              <StripedProgressBar
                progress={heroTask.progress}
                showPercentage={false}
                height="8px"
                interactive={true}
                onChange={(val) => updateTaskProgress(heroTask.id, val)}
              />
            </div>
          </div>
        )}

        {/* Right: Gantt Hourly Timeline Cards */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#12141d] border border-white/10 shadow-xl flex flex-col justify-between">
          <div>
            {/* Timeline Ruler */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px] font-mono text-slate-400 px-2">
              {timelineHours.map((hour, idx) => (
                <span
                  key={idx}
                  className={hour === '10.00' ? 'text-[#FF7A00] font-black underline underline-offset-4' : ''}
                >
                  {hour}
                </span>
              ))}
            </div>

            {/* Timeline Cards */}
            <div className="mt-5 flex flex-col gap-3.5">
              {timelineTasks.slice(1, 5).map((task, idx) => {
                // Responsive layout offsets
                const offsetStyles = [
                  'lg:ml-2 lg:mr-4',
                  'lg:ml-8 lg:mr-2',
                  'lg:ml-4 lg:mr-8',
                  'lg:ml-12 lg:mr-0'
                ];

                return (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-2xl bg-[#171a26] border border-white/10 shadow-md hover:border-white/20 transition-all ${
                      offsetStyles[idx % offsetStyles.length]
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <AvatarStack
                          members={task.members}
                          extraCount={task.joinedExtra || 3}
                          size={24}
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                            {task.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {task.time}
                          </span>
                        </div>
                      </div>

                      {/* Percentage Badge */}
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF7A00]/20 text-[#FF7A00] text-xs font-mono font-bold">
                        {task.progress}%
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <StripedProgressBar
                        progress={task.progress}
                        showPercentage={false}
                        height="6px"
                        interactive={true}
                        onChange={(val) => updateTaskProgress(task.id, val)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Drag or tap progress bars to adjust task completion rate</span>
            <span className="text-[#FF7A00] font-semibold">Live Time Scrubber Active</span>
          </div>
        </div>
      </div>
    </section>
  );
};
