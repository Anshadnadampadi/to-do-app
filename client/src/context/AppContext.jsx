import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { parseNotificationData } from '../components/NotificationToast';
import {
  INITIAL_USER,
  INITIAL_TASKS,
  INITIAL_HABITS,
  INITIAL_GOALS,
  INITIAL_DSA,
  INITIAL_AI_TOPICS,
  INITIAL_PROJECTS,
  INITIAL_JOURNALS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_UPLOADS,
  INITIAL_ROUTINE_BOX,
  CALENDAR_DAYS
} from '../data/initialData';
import { api } from '../services/api';
import { calculateLevel, XP_REWARDS } from '../utils/gamification';

const AppContext = createContext(null);

export const parseTaskDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return null;
  try {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const modifier = match[3] ? match[3].toUpperCase() : null;

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return new Date(year, month - 1, day, hours, minutes, 0, 0);
  } catch {
    return null;
  }
};

export const AppProvider = ({ children }) => {
  const currentYear = new Date().getFullYear();

  // Helper to sanitize any stale 2025 strings loaded from user localStorage
  const sanitizeStaleYear = (data) => {
    if (!data) return data;
    try {
      const json = JSON.stringify(data);
      if (json.includes('2025')) {
        const updated = json.replace(/2025/g, String(currentYear));
        return JSON.parse(updated);
      }
      return data;
    } catch {
      return data;
    }
  };

  // LocalStorage initialization helper with auto 2025 -> currentYear migration
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`winter_arc_${key}`);
      const parsed = saved ? JSON.parse(saved) : fallback;
      return sanitizeStaleYear(parsed);
    } catch {
      return fallback;
    }
  };

  const [user, setUser] = useState(() => {
    const loaded = loadState('user', INITIAL_USER);
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return {
      ...loaded,
      todayDateDisplay: (!loaded?.todayDateDisplay || loaded.todayDateDisplay.includes('2025'))
        ? todayStr
        : loaded.todayDateDisplay
    };
  });

  const [tasks, setTasks] = useState(() => {
    const loaded = loadState('tasks', INITIAL_TASKS);
    const legacyIds = new Set([
      'task-wireframes', 'task-feedback', 'task-uikit',
      'task-sprint-review', 'task-dsa-trees', 'task-1',
      'task-2', 'task-3', 'task-4', 'task-5', 'task-1790404036224'
    ]);
    const legacyTitles = new Set([
      'design wireframes for task',
      'review user feedback',
      'finalize ui kit',
      'development sprint team meeting',
      'binary tree maximum path sum',
      'gym'
    ]);
    if (!Array.isArray(loaded)) return [];
    return loaded.filter(t => {
      if (!t) return false;
      if (legacyIds.has(t.id) || legacyIds.has(t._id)) return false;
      if (t.title && legacyTitles.has(t.title.trim().toLowerCase())) return false;
      return true;
    });
  });
  const [habits, setHabits] = useState(() => loadState('habits', INITIAL_HABITS));
  const [goals, setGoals] = useState(() => loadState('goals', INITIAL_GOALS));
  const [dsa, setDsa] = useState(() => loadState('dsa', INITIAL_DSA));
  const [aiTopics, setAiTopics] = useState(() => loadState('aiTopics', INITIAL_AI_TOPICS));
  const [projects, setProjects] = useState(() => loadState('projects', INITIAL_PROJECTS));
  const [journals, setJournals] = useState(() => loadState('journals', INITIAL_JOURNALS));
  const [achievements, setAchievements] = useState(() => loadState('achievements', INITIAL_ACHIEVEMENTS));
  const [uploads, setUploads] = useState(() => loadState('uploads', INITIAL_UPLOADS));
  const [routines, setRoutines] = useState(() => loadState('routines', INITIAL_ROUTINE_BOX));

  // Calendar State & Dynamic Month/Day System (Full 12 Months & Real Today Integration)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth(); // 0 to 11
  const todayDate = today.getDate(); // 1 to 31

  const [activeYear, setActiveYear] = useState(todayYear);
  const [activeMonthIndex, setActiveMonthIndexState] = useState(todayMonth);
  const [selectedDayNumber, setSelectedDayNumber] = useState(todayDate);

  const getCalendarDays = (monthIdx, selectedDay, year = todayYear) => {
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const list = [];
    const now = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, monthIdx, d);
      const isToday = (
        d === now.getDate() &&
        monthIdx === now.getMonth() &&
        year === now.getFullYear()
      );
      list.push({
        dateNumber: d,
        dayName: dayLabels[dateObj.getDay()],
        isSelected: d === selectedDay,
        isToday,
        fullDateStr: `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      });
    }
    return list;
  };

  const [calendarDays, setCalendarDays] = useState(() => getCalendarDays(todayMonth, todayDate, todayYear));

  // Active Top-Level Navigation Module strictly from README.md:
  // 'tasks' (Tasks & Routine Checklist)
  // 'analytics' (Dashboard Metrics & Weekly Charts)
  // 'dsa-ai' (DSA LeetCode practice + 11 AI roadmap topics)
  // 'goals-projects' (Long-term career goals + Projects)
  // 'habits' (Daily habit consistency streaks)
  // 'journal' (Daily reflection journal with 4 prompts)
  // 'vault' (Resource uploads + Achievements)
  const [activeModule, setActiveModule] = useState('tasks');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isXpModalOpen, setIsXpModalOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState('home');
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [focusTaskTitle, setFocusTaskTitle] = useState('');
  const [notificationToast, setNotificationToast] = useState(null);
  const [notificationsHistory, setNotificationsHistory] = useState(() => [
    {
      id: 'init-1',
      title: 'WINTER ARC ACTIVE',
      message: `Daily protocols initiated for ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.`,
      type: 'routine',
      timestamp: Date.now() - 1000 * 60 * 12
    },
    {
      id: 'init-2',
      title: 'XP EARNED ⚡',
      message: 'Morning Focus Session completed',
      type: 'xp',
      xp: 50,
      timestamp: Date.now() - 1000 * 60 * 5
    }
  ]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(2);

  // Gamification & XP System with strict side-effect isolation & single-execution guarantee
  const addXp = (amount, reason = '') => {
    const xpToAdd = Math.max(0, Number(amount) || 0);
    if (xpToAdd <= 0) return;

    let leveledUpNotification = null;
    let xpGainNotification = null;

    setUser(prev => {
      const currentXp = Number(prev?.xp !== undefined && prev?.xp !== null ? prev.xp : 2850);
      const newXp = currentXp + xpToAdd;
      const prevLevel = calculateLevel(currentXp).level;
      const newLevelInfo = calculateLevel(newXp);

      if (newLevelInfo.level > prevLevel) {
        leveledUpNotification = {
          level: newLevelInfo.level,
          title: newLevelInfo.rank.title
        };
      } else if (reason) {
        xpGainNotification = {
          amount: xpToAdd,
          reason
        };
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevelInfo.level
      };
    });

    // Fire notifications asynchronously outside React's pure state updater
    setTimeout(() => {
      if (leveledUpNotification) {
        triggerCelebration();
        showToast(`🎉 LEVEL UP! You reached Level ${leveledUpNotification.level}: ${leveledUpNotification.title}! 🏆`);
      } else if (xpGainNotification) {
        showToast(`+${xpGainNotification.amount} XP: ${xpGainNotification.reason}! ⚡`);
      }
    }, 10);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('winter_arc_user', JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem('winter_arc_tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem('winter_arc_habits', JSON.stringify(habits));
  }, [habits]);
  useEffect(() => {
    localStorage.setItem('winter_arc_goals', JSON.stringify(goals));
  }, [goals]);
  useEffect(() => {
    localStorage.setItem('winter_arc_dsa', JSON.stringify(dsa));
  }, [dsa]);
  useEffect(() => {
    localStorage.setItem('winter_arc_aiTopics', JSON.stringify(aiTopics));
  }, [aiTopics]);
  useEffect(() => {
    localStorage.setItem('winter_arc_projects', JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    localStorage.setItem('winter_arc_journals', JSON.stringify(journals));
  }, [journals]);
  useEffect(() => {
    localStorage.setItem('winter_arc_achievements', JSON.stringify(achievements));
  }, [achievements]);
  useEffect(() => {
    localStorage.setItem('winter_arc_uploads', JSON.stringify(uploads));
  }, [uploads]);
  useEffect(() => {
    localStorage.setItem('winter_arc_routines', JSON.stringify(routines));
  }, [routines]);

  // Hydrate full-stack data from Express & MongoDB Backend on mount
  useEffect(() => {
    let isMounted = true;
    const hydrateFromBackend = async () => {
      try {
        const [tasksRes, habitsRes, goalsRes, dsaRes, aiRes, projectsRes, journalsRes, uploadsRes] = await Promise.allSettled([
          api.tasks.getAll(),
          api.habits.getAll(),
          api.goals.getAll(),
          api.dsa.get(),
          api.ai.getRoadmap(),
          api.projects.getAll(),
          api.journal.getAll(),
          api.uploads.getAll()
        ]);

        if (!isMounted) return;

        if (tasksRes.status === 'fulfilled' && tasksRes.value?.success && Array.isArray(tasksRes.value.data)) {
          const legacyIds = new Set([
            'task-wireframes', 'task-feedback', 'task-uikit',
            'task-sprint-review', 'task-dsa-trees', 'task-1',
            'task-2', 'task-3', 'task-4', 'task-5', 'task-1790404036224'
          ]);
          const legacyTitles = new Set([
            'design wireframes for task',
            'review user feedback',
            'finalize ui kit',
            'development sprint team meeting',
            'binary tree maximum path sum',
            'gym'
          ]);
          const cleaned = tasksRes.value.data
            .filter(t => t && !legacyIds.has(t.id) && !legacyIds.has(t._id) && !legacyTitles.has(t.title?.trim().toLowerCase()))
            .map(t => ({ ...t, id: t._id || t.id }));

          if (cleaned.length > 0) {
            setTasks(current => {
              const serverIds = new Set(cleaned.map(t => t.id || t._id));
              const localOnly = (current || []).filter(t => t && !serverIds.has(t.id) && !serverIds.has(t._id));
              // Push any unsynced local tasks to cloud database in background
              localOnly.forEach(t => {
                api.tasks.create(t).catch(() => {});
              });
              const merged = [...localOnly, ...cleaned];
              localStorage.setItem('winter_arc_tasks', JSON.stringify(merged));
              return merged;
            });
          } else {
            // Server returned empty list: do NOT erase user's local tasks! Push local tasks up to database instead
            setTasks(current => {
              if (current && current.length > 0) {
                current.forEach(t => {
                  api.tasks.create(t).catch(() => {});
                });
                return current;
              }
              return [];
            });
          }
        }
        if (habitsRes.status === 'fulfilled' && habitsRes.value?.success && Array.isArray(habitsRes.value.data) && habitsRes.value.data.length) {
          setHabits(habitsRes.value.data.map(h => ({ ...h, id: h._id || h.id })));
        }
        if (goalsRes.status === 'fulfilled' && goalsRes.value?.success && Array.isArray(goalsRes.value.data) && goalsRes.value.data.length) {
          setGoals(goalsRes.value.data.map(g => ({ ...g, id: g._id || g.id })));
        }
        if (dsaRes.status === 'fulfilled' && dsaRes.value?.success && dsaRes.value.data) {
          setDsa(dsaRes.value.data);
        }
        if (aiRes.status === 'fulfilled' && aiRes.value?.success && Array.isArray(aiRes.value.data) && aiRes.value.data.length) {
          setAiTopics(aiRes.value.data);
        }
        if (projectsRes.status === 'fulfilled' && projectsRes.value?.success && Array.isArray(projectsRes.value.data) && projectsRes.value.data.length) {
          setProjects(projectsRes.value.data.map(p => ({ ...p, id: p._id || p.id })));
        }
        if (journalsRes.status === 'fulfilled' && journalsRes.value?.success && Array.isArray(journalsRes.value.data) && journalsRes.value.data.length) {
          setJournals(journalsRes.value.data.map(j => ({ ...j, id: j._id || j.id })));
        }
        if (uploadsRes.status === 'fulfilled' && uploadsRes.value?.success && Array.isArray(uploadsRes.value.data) && uploadsRes.value.data.length) {
          setUploads(uploadsRes.value.data.map(u => ({ ...u, id: u._id || u.id })));
        }
      } catch (err) {
        console.warn('[Sync] Using cached local data fallback:', err.message);
      }
    };

    hydrateFromBackend();
    return () => { isMounted = false; };
  }, []);

  // Real-time Cloud Sync: Auto-refresh tasks whenever user focuses or returns to tab (mobile/desktop sync)
  const refreshTasksFromCloud = async (showNotification = false) => {
    try {
      const res = await api.tasks.getAll();
      if (res?.success && Array.isArray(res.data)) {
        const legacyIds = new Set([
          'task-wireframes', 'task-feedback', 'task-uikit',
          'task-sprint-review', 'task-dsa-trees', 'task-1',
          'task-2', 'task-3', 'task-4', 'task-5', 'task-1790404036224'
        ]);
        const legacyTitles = new Set([
          'design wireframes for task',
          'review user feedback',
          'finalize ui kit',
          'development sprint team meeting',
          'binary tree maximum path sum',
          'gym'
        ]);
        const cleaned = res.data
          .filter(t => t && !legacyIds.has(t.id) && !legacyIds.has(t._id) && !legacyTitles.has(t.title?.trim().toLowerCase()))
          .map(t => ({ ...t, id: t._id || t.id }));
        if (cleaned.length > 0) {
          setTasks(current => {
            const serverIds = new Set(cleaned.map(t => t.id || t._id));
            const localOnly = (current || []).filter(t => t && !serverIds.has(t.id) && !serverIds.has(t._id));
            const merged = [...localOnly, ...cleaned];
            localStorage.setItem('winter_arc_tasks', JSON.stringify(merged));
            return merged;
          });
        }
        if (showNotification) {
          showToast('Synced with cloud database ☁️');
        }
      }
    } catch {
      // offline or server unavailable
    }
  };

  useEffect(() => {
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        refreshTasksFromCloud(false);
      }
    };

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    return () => {
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    };
  }, []);

  // Toast trigger with auto-enrichment and history tracking
  const showToast = (messageOrObj, type = 'success', options = {}) => {
    let toastPayload;
    if (typeof messageOrObj === 'object' && messageOrObj !== null) {
      toastPayload = {
        id: Date.now() + Math.random(),
        ...messageOrObj,
        type: messageOrObj.type || type,
        duration: messageOrObj.duration || options.duration || 3800
      };
    } else {
      toastPayload = {
        id: Date.now() + Math.random(),
        message: String(messageOrObj),
        type,
        title: options.title || '',
        xp: options.xp || null,
        duration: options.duration || 3800
      };
    }

    const parsed = parseNotificationData(toastPayload);
    const enrichedToast = {
      ...toastPayload,
      ...parsed,
      id: toastPayload.id,
      timestamp: Date.now()
    };

    setNotificationToast(enrichedToast);
    setNotificationsHistory(prev => [enrichedToast, ...prev.slice(0, 19)]);
    setUnreadNotificationsCount(prev => prev + 1);
  };

  // Trigger celebration
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0EA5E9', '#38BDF8', '#BAE6FD', '#ffffff', '#10B981']
      });
    } catch {
      // ignore
    }
  };

  // Calendar Actions & Real Today Synchronization
  const selectDay = (dateNumber, monthIdx = activeMonthIndex, year = activeYear) => {
    setSelectedDayNumber(dateNumber);
    setCalendarDays(getCalendarDays(monthIdx, dateNumber, year));
    const selectedDate = new Date(year, monthIdx, dateNumber);
    const formatted = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    setUser(prev => ({
      ...prev,
      todayDateDisplay: formatted
    }));
  };

  const setActiveMonthIndex = (newMonthIdx) => {
    let targetMonth = newMonthIdx;
    let targetYear = activeYear;

    if (targetMonth < 0) {
      targetMonth = 11;
      targetYear -= 1;
    } else if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }

    setActiveYear(targetYear);
    setActiveMonthIndexState(targetMonth);
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    const newDay = Math.min(selectedDayNumber, daysInMonth);
    setSelectedDayNumber(newDay);
    setCalendarDays(getCalendarDays(targetMonth, newDay, targetYear));

    const selectedDate = new Date(targetYear, targetMonth, newDay);
    const formatted = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    setUser(prev => ({
      ...prev,
      todayDateDisplay: formatted
    }));
  };

  const setToday = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();
    setActiveYear(y);
    setActiveMonthIndexState(m);
    setSelectedDayNumber(d);
    setCalendarDays(getCalendarDays(m, d, y));
    const formatted = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    setUser(prev => ({
      ...prev,
      todayDateDisplay: formatted
    }));
    showToast(`Calendar synced to Today: ${formatted} 📅`);
  };

  // Task Actions (Full-Stack Synchronized)
  const addTask = (newTask) => {
    const todayIso = new Date().toISOString().split('T')[0];
    const taskObj = {
      id: `task-${Date.now()}`,
      title: newTask.title || 'Untitled Task',
      time: newTask.time || '10:00 AM',
      timeLabel: newTask.time || '10:00 AM',
      date: newTask.date || todayIso,
      category: newTask.category || 'Projects',
      priority: newTask.priority || 'High',
      statusBadge: newTask.statusBadge || 'In Progress',
      status: newTask.statusBadge === 'Completed' ? 'completed' : 'in-progress',
      progress: newTask.progress !== undefined ? newTask.progress : (newTask.statusBadge === 'Completed' ? 100 : 50),
      description: newTask.description || '',
      reminder: Boolean(newTask.reminder),
      reminderMinutesBefore: Number(newTask.reminderMinutesBefore) || 0,
      reminderTriggered: false,
      members: [{ name: user?.name || 'User', avatar: user?.avatar || '/assets/maddox_avatar.jpg' }],
      joinedExtra: 0
    };

    if (newTask.reminder) {
      requestNotificationPermission();
    }

    setTasks(prev => {
      const nextTasks = [taskObj, ...prev];
      try {
        localStorage.setItem('winter_arc_tasks', JSON.stringify(nextTasks));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }
      return nextTasks;
    });
    showToast(`Task "${taskObj.title}" created!`);
    triggerCelebration();

    // Sync to Express & MongoDB API
    api.tasks.create(taskObj).then(res => {
      if (res?.success && res.data) {
        setTasks(current => {
          const updated = current.map(t => (t.id === taskObj.id ? { ...t, ...res.data, id: res.data._id || res.data.id || t.id } : t));
          try {
            localStorage.setItem('winter_arc_tasks', JSON.stringify(updated));
          } catch (err) {
            console.warn('LocalStorage error:', err);
          }
          return updated;
        });
      }
    }).catch(err => console.warn('[API Sync] Task create cached locally:', err.message));
  };

  const updateTask = (id, updatedFields) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const updated = { ...t, ...updatedFields };
          if (updated.progress === 100) updated.status = 'completed';
          else if (updated.progress > 0) updated.status = 'in-progress';
          return updated;
        }
        return t;
      })
    );
    showToast('Task updated successfully');

    // Sync to Express & MongoDB API
    api.tasks.update(id, updatedFields).catch(err =>
      console.warn('[API Sync] Task update cached locally:', err.message)
    );
  };

  const toggleTaskCompleted = (id) => {
    let nextStatus = 'completed';
    let nextBadge = 'Completed';
    let nextProgress = 100;
    let becameCompleted = false;

    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const isNowCompleted = t.status !== 'completed';
          nextStatus = isNowCompleted ? 'completed' : 'in-progress';
          nextBadge = isNowCompleted ? 'Completed' : 'In Progress';
          nextProgress = isNowCompleted ? 100 : 50;

          if (isNowCompleted) {
            becameCompleted = true;
          }
          return {
            ...t,
            status: nextStatus,
            statusBadge: nextBadge,
            progress: nextProgress
          };
        }
        return t;
      })
    );

    if (becameCompleted) {
      triggerCelebration();
      addXp(XP_REWARDS.TASK_COMPLETE, 'Task Complete');
    }

    // Sync to Express & MongoDB API
    api.tasks.update(id, {
      status: nextStatus,
      statusBadge: nextBadge,
      progress: nextProgress
    }).catch(err => console.warn('[API Sync] Task toggle cached locally:', err.message));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast('Task deleted');

    // Sync to Express & MongoDB API
    api.tasks.delete(id).catch(err => console.warn('[API Sync] Task delete cached locally:', err.message));
  };

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem('winter_arc_tasks');
    showToast('All tasks cleared. Ready to start from scratch! 🎯');
    api.tasks.clearAll().catch(err => console.warn('[API Sync] Tasks clear cached locally:', err.message));
  };

  // Native Browser Notification Permission Request
  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
    if (Notification.permission === 'granted') return 'granted';
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch {
      return Notification.permission;
    }
  };

  // Toggle Reminder on a task
  const toggleTaskReminder = async (taskId, reminderMinutesBefore = 0) => {
    const target = tasks.find(t => t.id === taskId);
    if (!target) return;
    const nextReminder = !target.reminder;

    if (nextReminder) {
      await requestNotificationPermission();
    }

    updateTask(taskId, {
      reminder: nextReminder,
      reminderMinutesBefore: nextReminder ? reminderMinutesBefore : 0,
      reminderTriggered: false
    });

    if (nextReminder) {
      showToast({
        title: 'REMINDER SET 🔔',
        message: `Reminder active for "${target.title}" (${target.time})`,
        type: 'reminder'
      });
    } else {
      showToast(`Reminder turned off for "${target.title}"`);
    }
  };

  // Background Reminder Checker (polls every 15 seconds)
  useEffect(() => {
    const checkReminders = () => {
      const now = Date.now();

      tasks.forEach(task => {
        if (!task.reminder || task.status === 'completed' || task.reminderTriggered) return;

        const targetDate = parseTaskDateTime(task.date, task.time);
        if (!targetDate) return;

        const minutesBefore = Number(task.reminderMinutesBefore) || 0;
        const triggerTimeMs = targetDate.getTime() - (minutesBefore * 60 * 1000);

        // Fire if current time reached trigger time and is within 15 minutes window
        if (now >= triggerTimeMs && (now - triggerTimeMs) < 15 * 60 * 1000) {
          // In-App Toast
          showToast({
            title: 'TASK REMINDER ⏰',
            message: `${task.title} is scheduled for ${task.time}!`,
            type: 'reminder',
            duration: 6000
          });

          // Native Desktop Notification
          if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
            try {
              new Notification(`⏰ Task Reminder: ${task.title}`, {
                body: `${task.time} • ${task.category || 'Winter Arc'}${task.description ? `\n${task.description}` : ''}`,
                icon: '/favicon.ico'
              });
            } catch {
              // Ignore if notification fails
            }
          }

          // Add to Notification Center
          setNotificationsHistory(prev => [
            {
              id: `remind-${task.id}-${Date.now()}`,
              title: 'TASK REMINDER ⏰',
              message: `${task.title} scheduled for ${task.time}`,
              type: 'reminder',
              timestamp: Date.now()
            },
            ...prev
          ]);
          setUnreadNotificationsCount(c => c + 1);

          // Mark triggered
          updateTask(task.id, { reminderTriggered: true });
        }
      });
    };

    checkReminders();
    const interval = setInterval(checkReminders, 15000);
    return () => clearInterval(interval);
  }, [tasks]);

  // Habit Actions (Full-Stack Synchronized)
  const toggleHabitToday = (id) => {
    let becameDone = false;

    setHabits(prev =>
      prev.map(h => {
        if (h.id === id) {
          const nextState = !h.completedToday;
          const nextStreak = nextState ? h.streak + 1 : Math.max(0, h.streak - 1);
          if (nextState) {
            becameDone = true;
          }
          const nextHistory = [...h.history];
          nextHistory[nextHistory.length - 1] = nextState;
          return {
            ...h,
            completedToday: nextState,
            streak: nextStreak,
            history: nextHistory
          };
        }
        return h;
      })
    );

    if (becameDone) {
      triggerCelebration();
      addXp(XP_REWARDS.HABIT_TODAY, 'Habit Streak');
    }

    // Sync to Express & MongoDB API
    api.habits.toggle(id).catch(err => console.warn('[API Sync] Habit toggle cached locally:', err.message));
  };

  const addHabit = (newHabit) => {
    const habitObj = {
      id: `h-${Date.now()}`,
      name: newHabit.name || 'New Habit',
      category: newHabit.category || 'Personal',
      streak: 1,
      completedToday: true,
      history: [false, false, false, false, false, false, true]
    };
    setHabits(prev => [...prev, habitObj]);
    showToast(`Habit "${habitObj.name}" added!`);
    triggerCelebration();

    // Sync to Express & MongoDB API
    api.habits.create(habitObj).then(res => {
      if (res?.success && res.data) {
        setHabits(current =>
          current.map(h => (h.id === habitObj.id ? { ...h, ...res.data, id: res.data._id || res.data.id || h.id } : h))
        );
      }
    }).catch(err => console.warn('[API Sync] Habit create cached locally:', err.message));
  };

  // Goal Actions (Full-Stack Synchronized)
  const addGoal = (newGoal) => {
    const goalObj = {
      id: `goal-${Date.now()}`,
      title: newGoal.title || 'New Goal',
      category: newGoal.category || 'Projects',
      targetDate: newGoal.targetDate || '2026',
      progress: 0,
      milestones: (newGoal.milestones || ['Milestone 1']).map(m => ({ text: m, done: false }))
    };
    setGoals(prev => [goalObj, ...prev]);
    showToast(`Goal "${goalObj.title}" created!`);
    triggerCelebration();

    // Sync to Express & MongoDB API
    api.goals.create(goalObj).then(res => {
      if (res?.success && res.data) {
        setGoals(current =>
          current.map(g => (g.id === goalObj.id ? { ...g, ...res.data, id: res.data._id || res.data.id || g.id } : g))
        );
      }
    }).catch(err => console.warn('[API Sync] Goal create cached locally:', err.message));
  };

  const toggleMilestone = (goalId, milestoneIndex) => {
    let updatedMilestones = [];
    let becameDone = false;
    let goalCompleted = false;

    setGoals(prev =>
      prev.map(g => {
        if (g.id === goalId) {
          const currentMs = g.milestones[milestoneIndex];
          const nextDone = currentMs ? !currentMs.done : false;
          if (nextDone) {
            becameDone = true;
          }

          updatedMilestones = g.milestones.map((m, idx) =>
            idx === milestoneIndex ? { ...m, done: nextDone } : m
          );
          const doneCount = updatedMilestones.filter(m => m.done).length;
          const newProgress = Math.round((doneCount / updatedMilestones.length) * 100);
          if (newProgress === 100 && g.progress < 100) {
            goalCompleted = true;
          }

          return {
            ...g,
            milestones: updatedMilestones,
            progress: newProgress
          };
        }
        return g;
      })
    );

    // Only award XP and celebrate when a milestone is checked (NOT when unchecking)
    if (becameDone) {
      triggerCelebration();
      addXp(XP_REWARDS.GOAL_MILESTONE, 'Goal Milestone Completed');
    }
    if (goalCompleted) {
      showToast('🎯 Goal Completed! 100% Progress Reached!');
    }

    // Sync to Express & MongoDB API
    if (updatedMilestones.length) {
      api.goals.update(goalId, { milestones: updatedMilestones }).catch(err =>
        console.warn('[API Sync] Goal milestone cached locally:', err.message)
      );
    }
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    showToast('Goal deleted');

    // Sync to Express & MongoDB API
    api.goals.delete(id).catch(err => console.warn('[API Sync] Goal delete cached locally:', err.message));
  };

  // DSA Actions (Full-Stack Synchronized)
  const addDsaProblem = (problem) => {
    const newProblem = {
      id: `dsa-${Date.now()}`,
      name: problem.name || 'New Problem',
      platform: problem.platform || 'LeetCode',
      difficulty: problem.difficulty || 'Medium',
      timeTaken: problem.timeTaken || '20m',
      date: problem.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: problem.notes || 'Winter Arc focus practice',
      link: problem.link || '#'
    };

    setDsa(prev => {
      const isEasy = newProblem.difficulty === 'Easy';
      const isMed = newProblem.difficulty === 'Medium';
      const isHard = newProblem.difficulty === 'Hard';
      return {
        ...prev,
        totalSolved: prev.totalSolved + 1,
        easy: isEasy ? prev.easy + 1 : prev.easy,
        medium: isMed ? prev.medium + 1 : prev.medium,
        hard: isHard ? prev.hard + 1 : prev.hard,
        recentProblems: [newProblem, ...prev.recentProblems]
      };
    });
    triggerCelebration();
    addXp(XP_REWARDS.DSA_PROBLEM, `Solved ${newProblem.name}`);

    // Sync to Express & MongoDB API
    api.dsa.logProblem(newProblem).then(res => {
      if (res?.success && res.data) {
        setDsa(res.data);
      }
    }).catch(err => console.warn('[API Sync] DSA log cached locally:', err.message));
  };

  // AI Topic status (Full-Stack Synchronized)
  const updateAiTopicStatus = (id, newStatus) => {
    setAiTopics(prev =>
      prev.map(item => {
        if (item.id === id) {
          const progress = newStatus === 'Completed' ? 100 : newStatus === 'Learning' ? 60 : 0;
          return { ...item, status: newStatus, progress };
        }
        return item;
      })
    );
    showToast('AI Roadmap progress updated');
    if (newStatus === 'Completed') {
      addXp(XP_REWARDS.AI_TOPIC, 'AI Topic Complete');
    }

    // Sync to Express & MongoDB API
    api.ai.updateTopic(id, newStatus).catch(err =>
      console.warn('[API Sync] AI topic cached locally:', err.message)
    );
  };

  // Projects Actions (Full-Stack Synchronized)
  const addProject = (newProj) => {
    const projObj = {
      id: `proj-${Date.now()}`,
      name: newProj.name || 'New Project',
      description: newProj.description || '',
      category: newProj.category || 'Full Stack',
      progress: parseInt(newProj.progress || 20, 10),
      status: 'Active',
      githubUrl: newProj.githubUrl || 'https://github.com/anshad',
      liveUrl: newProj.liveUrl || '#',
      techStack: newProj.techStack || ['React', 'Node.js']
    };
    setProjects(prev => [projObj, ...prev]);
    showToast(`Project "${projObj.name}" added!`);
    triggerCelebration();

    // Sync to Express & MongoDB API
    api.projects.create(projObj).then(res => {
      if (res?.success && res.data) {
        setProjects(current =>
          current.map(p => (p.id === projObj.id ? { ...p, ...res.data, id: res.data._id || res.data.id || p.id } : p))
        );
      }
    }).catch(err => console.warn('[API Sync] Project create cached locally:', err.message));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project deleted');

    // Sync to Express & MongoDB API
    api.projects.delete(id).catch(err => console.warn('[API Sync] Project delete cached locally:', err.message));
  };

  // Journal entry (Full-Stack Synchronized)
  const addJournalEntry = (entry) => {
    const newEntry = {
      id: `j-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      mood: entry.mood || '🔥 High Focus',
      productivityScore: entry.productivityScore || 9,
      q1: entry.q1 || '',
      q2: entry.q2 || '',
      q3: entry.q3 || '',
      q4: entry.q4 || ''
    };
    setJournals(prev => [newEntry, ...prev]);
    showToast('Daily reflection saved to Journal');
    triggerCelebration();
    addXp(XP_REWARDS.JOURNAL_REFLECTION, 'Daily Reflection');

    // Sync to Express & MongoDB API
    api.journal.create(newEntry).then(res => {
      if (res?.success && res.data) {
        setJournals(current =>
          current.map(j => (j.id === newEntry.id ? { ...j, ...res.data, id: res.data._id || res.data.id || j.id } : j))
        );
      }
    }).catch(err => console.warn('[API Sync] Journal create cached locally:', err.message));
  };

  // Upload Actions (Full-Stack Synchronized)
  const addUpload = (newUpload) => {
    const uploadObj = {
      id: `up-${Date.now()}`,
      title: newUpload.title || 'Document.pdf',
      type: newUpload.type || 'PDFs',
      size: newUpload.size || '500 KB',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      url: newUpload.url || '#'
    };
    setUploads(prev => [uploadObj, ...prev]);
    showToast(`Resource "${uploadObj.title}" uploaded!`);
    addXp(XP_REWARDS.RESOURCE_UPLOAD, 'Vault Resource');

    // Sync to Express & MongoDB API
    api.uploads.create(uploadObj).then(res => {
      if (res?.success && res.data) {
        setUploads(current =>
          current.map(u => (u.id === uploadObj.id ? { ...u, ...res.data, id: res.data._id || res.data.id || u.id } : u))
        );
      }
    }).catch(err => console.warn('[API Sync] Upload create cached locally:', err.message));
  };

  const deleteUpload = (id) => {
    setUploads(prev => prev.filter(u => u.id !== id));
    showToast('Resource deleted');

    // Sync to Express & MongoDB API
    api.uploads.delete(id).catch(err => console.warn('[API Sync] Upload delete cached locally:', err.message));
  };

  // Routine Checklist Actions
  const toggleRoutine = (id) => {
    let becameDone = false;
    let rTitle = '';
    setRoutines(prev =>
      prev.map(r => {
        if (r.id === id) {
          const next = !r.isCompleted;
          if (next) {
            becameDone = true;
            rTitle = r.title;
          }
          return { ...r, isCompleted: next };
        }
        return r;
      })
    );
    if (becameDone) {
      triggerCelebration();
      addXp(XP_REWARDS.ROUTINE_COMPLETE, `Routine: ${rTitle}`);
      showToast(`Completed routine: "${rTitle}" ✓`);
    }
  };

  const addRoutine = (newRoutine) => {
    const routineObj = {
      id: `routine-${Date.now()}`,
      title: newRoutine.title || 'New Routine',
      iconName: newRoutine.iconName || 'Sparkles',
      category: newRoutine.category || 'Personal',
      time: newRoutine.time || '9:00 AM',
      isCompleted: false
    };
    setRoutines(prev => [...prev, routineObj]);
    showToast(`Added routine: "${routineObj.title}" ✨`);
  };

  const editRoutine = (id, fields) => {
    setRoutines(prev =>
      prev.map(r => (r.id === id ? { ...r, ...fields } : r))
    );
    showToast(`Routine updated!`);
  };

  const deleteRoutine = (id) => {
    setRoutines(prev => prev.filter(r => r.id !== id));
    showToast(`Routine deleted`);
  };

  const duplicateRoutine = (id) => {
    setRoutines(prev => {
      const item = prev.find(r => r.id === id);
      if (!item) return prev;
      const copy = {
        ...item,
        id: `routine-${Date.now()}`,
        title: `${item.title} (Copy)`,
        isCompleted: false
      };
      return [...prev, copy];
    });
    showToast(`Routine duplicated`);
  };

  // Reset to default sample data
  const resetAllData = () => {
    localStorage.clear();
    setUser(INITIAL_USER);
    setTasks(INITIAL_TASKS);
    setHabits(INITIAL_HABITS);
    setGoals(INITIAL_GOALS);
    setDsa(INITIAL_DSA);
    setAiTopics(INITIAL_AI_TOPICS);
    setProjects(INITIAL_PROJECTS);
    setJournals(INITIAL_JOURNALS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setUploads(INITIAL_UPLOADS);
    setRoutines(INITIAL_ROUTINE_BOX);
    showToast('Data reset to default Winter Arc state');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        clearAllTasks,
        toggleTaskCompleted,
        toggleTaskReminder,
        requestNotificationPermission,
        refreshTasksFromCloud,
        routines,
        setRoutines,
        toggleRoutine,
        addRoutine,
        editRoutine,
        deleteRoutine,
        duplicateRoutine,
        habits,
        toggleHabitToday,
        addHabit,
        goals,
        addGoal,
        deleteGoal,
        toggleMilestone,
        dsa,
        addDsaProblem,
        aiTopics,
        updateAiTopicStatus,
        projects,
        addProject,
        deleteProject,
        journals,
        addJournalEntry,
        achievements,
        uploads,
        addUpload,
        deleteUpload,
        calendarDays,
        selectedDayNumber,
        selectDay,
        activeMonthIndex,
        setActiveMonthIndex,
        activeYear,
        setToday,
        isViewingToday: (
          activeMonthIndex === today.getMonth() &&
          selectedDayNumber === today.getDate() &&
          activeYear === today.getFullYear()
        ),
        months,
        currentYear,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        activeModule,
        setActiveModule,
        isTaskModalOpen,
        setIsTaskModalOpen,
        editingTask,
        setEditingTask,
        isJournalModalOpen,
        setIsJournalModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isXpModalOpen,
        setIsXpModalOpen,
        mobileSection,
        setMobileSection,
        isFocusModalOpen,
        setIsFocusModalOpen,
        focusTaskTitle,
        setFocusTaskTitle,
        startFocusSession: (taskTitle = '') => {
          setFocusTaskTitle(taskTitle);
          setIsFocusModalOpen(true);
        },
        addXp,
        notificationToast,
        setNotificationToast,
        notificationsHistory,
        unreadNotificationsCount,
        markNotificationsRead: () => setUnreadNotificationsCount(0),
        clearNotificationsHistory: () => {
          setNotificationsHistory([]);
          setUnreadNotificationsCount(0);
        },
        showToast,
        triggerCelebration,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
