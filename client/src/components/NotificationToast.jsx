import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Zap,
  Flame,
  Sparkles,
  AlertCircle,
  Info,
  BookOpen,
  Target,
  Trophy,
  X
} from 'lucide-react';

// Play subtle, non-intrusive native synthesizer micro-chime (Apple-like haptic feel)
const playNotificationChime = (type = 'success') => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'xp' || type === 'level') {
      // Ascending two-tone reward chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'error') {
      // Soft gentle warning
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.1); // C4
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      // Soft pleasant high pop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch {
    // AudioContext blocked or not supported
  }
};

// Helper to parse any raw toast input into clean structured data
export const parseNotificationData = (toast) => {
  if (!toast) return null;

  let message = typeof toast === 'string' ? toast : (toast.message || '');
  let title = (typeof toast === 'object' && toast.title) || '';
  let type = (typeof toast === 'object' && toast.type) || 'success';
  let xp = (typeof toast === 'object' && toast.xp) || null;
  const duration = (typeof toast === 'object' && toast.duration) || 3800;

  // Extract XP value if present in string
  if (!xp) {
    const xpMatch = message.match(/\+(\d+)\s*XP/i);
    if (xpMatch) {
      xp = parseInt(xpMatch[1], 10);
      type = 'xp';
    }
  }

  const lower = message.toLowerCase();

  // Smart type & title categorization
  if (lower.includes('level up') || message.includes('🎉')) {
    type = 'level';
    if (!title) title = 'LEVEL UP! 🏆';
    message = message.replace(/🎉|🏆|LEVEL UP!/gi, '').trim();
    if (message.startsWith(':')) message = message.slice(1).trim();
  } else if (type === 'xp' || lower.includes('xp:')) {
    type = 'xp';
    if (!title) title = 'XP EARNED ⚡';
    message = message.replace(/^\+\d+\s*XP:\s*/i, '').replace(/!*⚡*/g, '').trim();
  } else if (lower.includes('routine')) {
    type = 'routine';
    if (!title) title = 'ROUTINE CHECKED';
    message = message.replace(/✓/g, '').trim();
  } else if (lower.includes('habit') || lower.includes('streak')) {
    type = 'streak';
    if (!title) title = 'STREAK ADVANCED 🔥';
  } else if (lower.includes('task')) {
    type = 'task';
    if (!title) {
      if (lower.includes('created')) title = 'TASK CREATED';
      else if (lower.includes('deleted') || lower.includes('removed')) title = 'TASK REMOVED';
      else if (lower.includes('updated')) title = 'TASK UPDATED';
      else title = 'TASK COMPLETED';
    }
  } else if (lower.includes('goal')) {
    type = 'goal';
    if (!title) {
      if (lower.includes('deleted')) title = 'GOAL REMOVED';
      else title = 'GOAL MILESTONE 🎯';
    }
  } else if (lower.includes('journal') || lower.includes('reflection')) {
    type = 'journal';
    if (!title) title = 'JOURNAL REFLECTION 📖';
  } else if (type === 'error' || lower.includes('failed') || lower.includes('please')) {
    type = 'error';
    if (!title) title = 'ATTENTION';
  } else if (lower.includes('reset') || lower.includes('default state')) {
    type = 'info';
    if (!title) title = 'SYSTEM RESET 🔄';
  } else if (lower.includes('welcome') || lower.includes('signed in') || lower.includes('account created')) {
    type = 'auth';
    if (!title) title = 'AUTHENTICATION';
  } else if (!title) {
    title = 'NOTIFICATION';
  }

  return {
    title,
    message,
    type,
    xp,
    duration
  };
};

export const NotificationToast = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const remainingTimeRef = useRef(3800);

  const parsed = parseNotificationData(toast);

  // Play subtle chime on toast mount
  useEffect(() => {
    if (parsed) {
      playNotificationChime(parsed.type);
      remainingTimeRef.current = parsed.duration || 3800;
      startTimeRef.current = Date.now();
      setIsExiting(false);

      startTimer(remainingTimeRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast]);

  const startTimer = (ms) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      triggerDismiss();
    }, Math.max(ms, 400));
  };

  const triggerDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 240);
  };

  // Pause on hover so the user can easily read or interact
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = Math.max(800, remainingTimeRef.current - elapsed);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now();
    startTimer(remainingTimeRef.current);
  };

  if (!toast || !parsed) return null;

  // Theme configurations for each notification category
  const themeConfig = {
    level: {
      icon: <Trophy size={18} className="text-white" />,
      gradient: 'linear-gradient(135deg, #F59E0B, #EAB308)',
      color: '#D97706',
      progressGradient: 'linear-gradient(90deg, #F59E0B, #EAB308)'
    },
    xp: {
      icon: <Zap size={18} className="fill-white text-white" />,
      gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
      color: '#D97706',
      progressGradient: 'linear-gradient(90deg, #F59E0B, #FBBF24)'
    },
    task: {
      icon: <CheckCircle2 size={18} className="text-white" strokeWidth={2.4} />,
      gradient: 'linear-gradient(135deg, #10B981, #0D9488)',
      color: '#059669',
      progressGradient: 'linear-gradient(90deg, #10B981, #34D399)'
    },
    routine: {
      icon: <Sparkles size={18} className="text-white" />,
      gradient: 'linear-gradient(135deg, #1867FF, #0D4FE0)',
      color: '#1867FF',
      progressGradient: 'linear-gradient(90deg, #1867FF, #38BDF8)'
    },
    streak: {
      icon: <Flame size={18} className="fill-white text-white" />,
      gradient: 'linear-gradient(135deg, #F97316, #EF4444)',
      color: '#EA580C',
      progressGradient: 'linear-gradient(90deg, #F97316, #FB923C)'
    },
    journal: {
      icon: <BookOpen size={18} className="text-white" />,
      gradient: 'linear-gradient(135deg, #0EA5E9, #2563EB)',
      color: '#0284C7',
      progressGradient: 'linear-gradient(90deg, #0EA5E9, #38BDF8)'
    },
    goal: {
      icon: <Target size={18} className="text-white" />,
      gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
      color: '#7C3AED',
      progressGradient: 'linear-gradient(90deg, #8B5CF6, #A78BFA)'
    },
    error: {
      icon: <AlertCircle size={18} className="text-white" />,
      gradient: 'linear-gradient(135deg, #F43F5E, #E11D48)',
      color: '#E11D48',
      progressGradient: 'linear-gradient(90deg, #F43F5E, #FB7185)'
    },
    auth: {
      icon: <CheckCircle2 size={18} className="text-white" strokeWidth={2.4} />,
      gradient: 'linear-gradient(135deg, #1E293B, #0F172A)',
      color: '#334155',
      progressGradient: 'linear-gradient(90deg, #334155, #64748B)'
    },
    info: {
      icon: <Info size={18} className="text-white" />,
      gradient: 'linear-gradient(135deg, #1867FF, #1E293B)',
      color: '#1867FF',
      progressGradient: 'linear-gradient(90deg, #1867FF, #60A5FA)'
    },
    success: {
      icon: <CheckCircle2 size={18} className="text-white" strokeWidth={2.4} />,
      gradient: 'linear-gradient(135deg, #10B981, #0D9488)',
      color: '#059669',
      progressGradient: 'linear-gradient(90deg, #10B981, #34D399)'
    }
  };

  const theme = themeConfig[parsed.type] || themeConfig.success;

  return (
    <div
      className={`floating-toast-wrapper ${isExiting ? 'exit' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="floating-toast-card"
      >
        {/* Left Category Icon Badge */}
        <div
          className="floating-toast-icon-badge"
          style={{ background: theme.gradient }}
        >
          {theme.icon}
        </div>

        {/* Center Content Hierarchy */}
        <div className="floating-toast-content">
          <div className="floating-toast-header" style={{ color: theme.color }}>
            {parsed.title}
          </div>
          <p className="floating-toast-message">
            {parsed.message}
          </p>
        </div>

        {/* Optional XP Tag */}
        {parsed.xp && (
          <div className="floating-toast-xp-pill">
            <Zap size={11} className="fill-amber-500 text-amber-500" />
            <span>+{parsed.xp} XP</span>
          </div>
        )}

        {/* Close / Dismiss Action */}
        <button
          onClick={triggerDismiss}
          className="floating-toast-close-btn"
          title="Dismiss notification"
          aria-label="Dismiss notification"
          type="button"
        >
          <X size={15} strokeWidth={2.5} />
        </button>

        {/* Bottom Time-Remaining Progress Line */}
        <div className="floating-toast-progress-track">
          <div
            className="floating-toast-progress-bar"
            style={{
              background: theme.progressGradient,
              animationDuration: `${parsed.duration || 3800}ms`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          />
        </div>
      </div>
    </div>
  );
};
