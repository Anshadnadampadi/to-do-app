import React, { useState } from 'react';
import {
  ChevronLeft,
  MoreHorizontal,
  MoreVertical,
  Check,
  Plus,
  Sparkles,
  Smile,
  Home,
  Droplet,
  Coffee,
  BookOpen,
  Sun,
  Utensils,
  Pencil,
  Copy,
  RotateCcw,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RoutineModal } from '../components/RoutineModal';

export const ScreenAddTaskBox = ({ onNavigateBack, onOpenAddModal }) => {
  const {
    routines,
    toggleRoutine,
    deleteRoutine,
    duplicateRoutine,
    triggerCelebration,
    showToast
  } = useApp();

  const [activeSegment, setActiveSegment] = useState('task-box'); // 'add-task' | 'task-box'
  const [activeMenuRoutine, setActiveMenuRoutine] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);

  const handleOpenMenu = (e, routine) => {
    e.stopPropagation();
    if (activeMenuRoutine?.id === routine.id) {
      setActiveMenuRoutine(null);
      setMenuPosition(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 185;
    const menuHeight = 175;

    let left = rect.right - menuWidth - 4;
    if (left < 12) left = 12;
    if (left + menuWidth > window.innerWidth - 12) {
      left = window.innerWidth - menuWidth - 12;
    }

    let top = rect.bottom + 6;
    if (top + menuHeight > window.innerHeight - 12 && rect.top > menuHeight + 12) {
      top = rect.top - menuHeight - 6;
    }

    setMenuPosition({ top, left });
    setActiveMenuRoutine(routine);
  };

  useEffect(() => {
    const handleClose = () => {
      if (activeMenuRoutine) {
        setActiveMenuRoutine(null);
        setMenuPosition(null);
      }
    };
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, [activeMenuRoutine]);

  const getIcon = (name) => {
    switch (name) {
      case 'Sparkles': return <Sparkles size={18} className="text-slate-600" />;
      case 'Smile': return <Smile size={18} className="text-slate-600" />;
      case 'Home': return <Home size={18} className="text-slate-600" />;
      case 'Droplet': return <Droplet size={18} className="text-slate-600" />;
      case 'Coffee': return <Coffee size={18} className="text-slate-600" />;
      case 'BookOpen': return <BookOpen size={18} className="text-slate-600" />;
      case 'Sun': return <Sun size={18} className="text-slate-600" />;
      case 'Utensils': return <Utensils size={18} className="text-slate-600" />;
      default: return <Sparkles size={18} className="text-slate-600" />;
    }
  };

  return (
    <div className="relative flex-1 flex flex-col px-5 pt-1 pb-16 overflow-y-auto select-none bg-[#F4F7FB]">
      {/* Top Header matching screenshot */}
      <div className="w-full flex items-center justify-between pt-1 pb-4">
        {/* Back Button */}
        <button
          onClick={onNavigateBack}
          className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          title="Go back"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        {/* Title */}
        <h1 className="text-base font-bold text-slate-800 tracking-tight">
          Add Task
        </h1>

        {/* More Options Button */}
        <button
          className="w-10 h-10 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          title="More options"
        >
          <MoreHorizontal size={18} strokeWidth={2.2} />
        </button>
      </div>

      {/* Segmented Control Switcher from Screenshot */}
      <div className="mt-2 w-full flex items-center justify-center">
        <div className="segmented-control w-full max-w-[280px]">
          <button
            onClick={() => {
              setActiveSegment('add-task');
              onOpenAddModal();
            }}
            className={`flex-1 segmented-button ${
              activeSegment === 'add-task' ? 'active' : ''
            }`}
          >
            Add Task
          </button>

          <button
            onClick={() => setActiveSegment('task-box')}
            className={`flex-1 segmented-button ${
              activeSegment === 'task-box' ? 'active' : ''
            }`}
          >
            Task Box
          </button>
        </div>
      </div>

      {/* Task Routine Checklist Items matching Screenshot */}
      <div className="mt-5 flex flex-col gap-2.5">
        {routines.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleRoutine(item.id)}
            className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(24,39,75,0.04)] hover:shadow-md flex items-center justify-between cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3.5">
              {/* Outline Icon Container */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  item.isCompleted
                    ? 'bg-[#F0F9FF] border border-[#BAE6FD] text-[#0EA5E9]'
                    : 'bg-slate-50 border border-slate-100 text-slate-600'
                }`}
              >
                {item.isCompleted ? (
                  <Check size={18} strokeWidth={3} className="text-[#0EA5E9]" />
                ) : (
                  getIcon(item.iconName)
                )}
              </div>

              {/* Task Title */}
              <div className="flex flex-col">
                <span
                  className={`text-sm font-semibold tracking-tight ${
                    item.isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}
                >
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {item.time}
                </span>
              </div>
            </div>

            {/* Right Actions: 3 Vertical Dots */}
            <div className="relative">
              <button
                onClick={(e) => handleOpenMenu(e, item)}
                className={`p-1.5 rounded-lg transition-all border-none ${
                  activeMenuRoutine?.id === item.id
                    ? 'bg-slate-200 text-slate-800'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
                title="More options"
                type="button"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Routine 3-dots Dropdown Menu (Escapes scrollable clipping) */}
      {activeMenuRoutine && menuPosition && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          <div
            className="fixed inset-0 bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenuRoutine(null);
              setMenuPosition(null);
            }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              width: '185px'
            }}
            className="routine-actions-menu animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-0.5 select-none"
          >
            <button
              onClick={() => {
                toggleRoutine(activeMenuRoutine.id);
                setActiveMenuRoutine(null);
                setMenuPosition(null);
              }}
              className="routine-actions-item"
              type="button"
            >
              {activeMenuRoutine.isCompleted ? (
                <>
                  <RotateCcw size={15} className="text-amber-500 shrink-0" />
                  <span>Mark Incomplete</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  <span>Mark Completed</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setEditingRoutine(activeMenuRoutine);
                setIsRoutineModalOpen(true);
                setActiveMenuRoutine(null);
                setMenuPosition(null);
              }}
              className="routine-actions-item"
              type="button"
            >
              <Pencil size={15} className="text-[#1867FF] shrink-0" />
              <span>Edit Routine</span>
            </button>

            <button
              onClick={() => {
                duplicateRoutine(activeMenuRoutine.id);
                setActiveMenuRoutine(null);
                setMenuPosition(null);
              }}
              className="routine-actions-item"
              type="button"
            >
              <Copy size={15} className="text-slate-500 shrink-0" />
              <span>Duplicate</span>
            </button>

            <div className="h-px bg-slate-100 my-1" />

            <button
              onClick={() => {
                deleteRoutine(activeMenuRoutine.id);
                setActiveMenuRoutine(null);
                setMenuPosition(null);
              }}
              className="routine-actions-item danger"
              type="button"
            >
              <Trash2 size={15} className="shrink-0" />
              <span>Delete Routine</span>
            </button>
          </div>
        </div>
      )}

      {/* Routine Add / Edit Modal */}
      <RoutineModal
        isOpen={isRoutineModalOpen}
        onClose={() => {
          setIsRoutineModalOpen(false);
          setEditingRoutine(null);
        }}
        routineToEdit={editingRoutine}
      />
    </div>
  );
};
