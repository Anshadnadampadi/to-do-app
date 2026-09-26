import React, { useState } from 'react';
import {
  Check,
  Search,
  Plus,
  Clock,
  Flame,
  AlertCircle,
  Filter,
  CheckCircle2,
  Trash2,
  Edit3,
  Calendar as CalendarIcon,
  Tag,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AvatarStack } from './AvatarStack';
import { StripedProgressBar } from './StripedProgressBar';
import { CATEGORIES } from '../data/initialData';

export const PhenomenonTaskCommand = ({ onOpenTaskModal }) => {
  const {
    tasks,
    toggleTaskCompleted,
    updateTaskProgress,
    deleteTask,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const [phaseFilter, setPhaseFilter] = useState('all'); // 'all', 'launch', 'evolve', 'completed'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all', 'Urgent', 'High', 'Medium'

  // Filter tasks based on stage, category, priority, and search
  const filteredTasks = tasks.filter(task => {
    // Stage / Phase filter
    if (phaseFilter === 'evolve' && (task.status === 'completed' || task.progress === 0)) return false;
    if (phaseFilter === 'completed' && task.status !== 'completed') return false;
    if (phaseFilter === 'launch' && (task.status === 'completed' || task.progress > 0)) return false;

    // Priority filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

    // Category filter
    if (selectedCategory !== 'All' && task.category !== selectedCategory) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchSub = task.subtitle?.toLowerCase().includes(q);
      const matchCat = task.category.toLowerCase().includes(q);
      const matchTags = task.tags?.some(tag => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchSub && !matchCat && !matchTags) return false;
    }

    return true;
  });

  const inProgressCount = tasks.filter(t => t.status !== 'completed' && t.progress > 0).length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const backlogCount = tasks.filter(t => t.status !== 'completed' && t.progress === 0).length;

  return (
    <section id="command-tasks" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 border-b border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF7A00] mb-2 flex items-center gap-1.5">
            <span>01 / TASK COMMAND CENTER</span>
            <span>•</span>
            <span className="text-slate-400">HAULIX FLEET & SPRINT MONITORING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Active Sprint & Deliverables
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Monitor real-time task progress, adjust completion velocity, and organize work across development categories.
          </p>
        </div>

        {/* Create Task Button */}
        <button
          onClick={onOpenTaskModal}
          className="ph-btn ph-btn-orange shrink-0 self-start md:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>New Task</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Workflow Phase Tabs (Phenomenon Stage Design) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 mb-6 no-scrollbar">
        <button
          onClick={() => setPhaseFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
            phaseFilter === 'all'
              ? 'bg-white text-black shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          All Deliverables ({tasks.length})
        </button>

        <button
          onClick={() => setPhaseFilter('evolve')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            phaseFilter === 'evolve'
              ? 'bg-[#FF7A00] text-white shadow-[0_0_15px_rgba(255,122,0,0.35)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>Evolve / In Progress</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
            {inProgressCount}
          </span>
        </button>

        <button
          onClick={() => setPhaseFilter('launch')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            phaseFilter === 'launch'
              ? 'bg-white text-black'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>Launch / Backlog</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 font-mono">
            {backlogCount}
          </span>
        </button>

        <button
          onClick={() => setPhaseFilter('completed')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            phaseFilter === 'completed'
              ? 'bg-emerald-500 text-black'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>Shipped / Done</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 font-mono">
            {completedCount}
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Priority Selector */}
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search tasks, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12141d] border border-white/10 focus:border-[#FF7A00] rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <Search size={14} className="absolute left-3.5 top-2.5 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#12141d] border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="Urgent">Urgent 🔥</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Task Cards Grid (Responsive 1-col on mobile, 2-col on large screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-3xl bg-[#12141d] border border-white/10 text-slate-400">
            <p className="text-sm font-semibold">No tasks match the selected criteria.</p>
            <button
              onClick={() => {
                setPhaseFilter('all');
                setSelectedCategory('All');
                setSearchQuery('');
                setPriorityFilter('all');
              }}
              className="mt-3 text-xs text-[#FF7A00] hover:underline font-bold"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'completed';

            return (
              <div
                key={task.id}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-4 ${
                  isDone
                    ? 'bg-[#10121a]/60 border-white/5 opacity-70'
                    : 'bg-[#151722] border-white/10 hover:border-white/25 shadow-lg'
                }`}
              >
                {/* Top Row: Checkbox, Title, Category Badge, Priority */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Checkmark Button */}
                      <button
                        onClick={() => toggleTaskCompleted(task.id)}
                        className={`w-6 h-6 rounded-lg mt-0.5 flex items-center justify-center transition-all shrink-0 ${
                          isDone
                            ? 'bg-[#FF7A00] text-white shadow-[0_0_10px_rgba(255,122,0,0.4)]'
                            : 'border border-white/20 bg-white/5 text-transparent hover:border-[#FF7A00]'
                        }`}
                        title={isDone ? "Mark as in-progress" : "Mark as completed"}
                      >
                        <Check size={14} strokeWidth={3} />
                      </button>

                      {/* Title & Subtitle */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`text-sm sm:text-base font-bold tracking-tight ${
                              isDone ? 'line-through text-slate-400' : 'text-white'
                            }`}
                          >
                            {task.title}
                          </h3>

                          {/* Category Badge */}
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">
                            {task.category}
                          </span>

                          {/* Priority Badge */}
                          {task.priority === 'Urgent' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                              Urgent 🔥
                            </span>
                          )}
                          {task.priority === 'High' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF7A00]/20 text-[#FF7A00] font-semibold">
                              High
                            </span>
                          )}
                        </div>

                        {task.subtitle && (
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {task.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Delete Action Button */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-slate-500 hover:text-red-400 p-1 rounded-md transition-colors"
                      title="Delete task"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Time & Tags */}
                  <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock size={12} />
                      {task.time}
                    </span>
                    {task.tags?.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Member Avatars & Striped Progress Bar */}
                <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <AvatarStack
                    members={task.members}
                    extraCount={task.joinedExtra || 2}
                    size={24}
                  />

                  <div className="flex items-center gap-3 sm:w-56">
                    <div className="flex-1">
                      <StripedProgressBar
                        progress={task.progress}
                        showPercentage={true}
                        height="7px"
                        interactive={true}
                        onChange={(val) => updateTaskProgress(task.id, val)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
