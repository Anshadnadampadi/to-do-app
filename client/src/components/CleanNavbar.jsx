import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Plus,
  BookOpen,
  Search,
  X,
  RotateCcw,
  Zap,
  Bell,
  Sparkles,
  Flame,
  AlertCircle,
  Trophy,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateLevel } from '../utils/gamification';

// Helper to format relative time (e.g. "Just now", "2m ago")
const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'Just now';
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 45) return 'Just now';
  if (diffSec < 90) return '1m ago';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  return `${Math.floor(diffHour / 24)}d ago`;
};

export const CleanNavbar = ({ onOpenTaskModal, onOpenJournalModal }) => {
  const {
    user,
    searchQuery,
    setSearchQuery,
    resetAllData,
    setActiveModule,
    setIsAuthModalOpen,
    setIsXpModalOpen,
    notificationsHistory = [],
    unreadNotificationsCount = 0,
    markNotificationsRead,
    clearNotificationsHistory,
    showToast
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close notifications popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };
    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationOpen]);

  const toggleNotifications = () => {
    if (!isNotificationOpen && markNotificationsRead) {
      markNotificationsRead();
    }
    setIsNotificationOpen(prev => !prev);
  };

  const levelInfo = calculateLevel(user?.xp || 2850);

  // Render category micro-badge for notification center items
  const renderItemBadge = (type) => {
    switch (type) {
      case 'level':
        return (
          <div className="notification-item-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #EAB308)' }}>
            <Trophy size={14} />
          </div>
        );
      case 'xp':
        return (
          <div className="notification-item-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
            <Zap size={14} className="fill-white" />
          </div>
        );
      case 'task':
        return (
          <div className="notification-item-icon" style={{ background: 'linear-gradient(135deg, #10B981, #0D9488)' }}>
            <CheckCircle2 size={14} />
          </div>
        );
      case 'routine':
        return (
          <div className="notification-item-icon" style={{ background: 'linear-gradient(135deg, #1867FF, #0D4FE0)' }}>
            <Sparkles size={14} />
          </div>
        );
      case 'streak':
        return (
          <div className="notification-item-icon" style={{ background: 'linear-gradient(135deg, #F97316, #EF4444)' }}>
            <Flame size={14} className="fill-white" />
          </div>
        );
      case 'journal':
        return (
          <div className="notification-item-icon" style={{ background: 'linear-gradient(135deg, #0EA5E9, #2563EB)' }}>
            <BookOpen size={14} />
          </div>
        );
      case 'error':
        return (
          <div className="notification-item-icon" style={{ background: 'linear-gradient(135deg, #F43F5E, #E11D48)' }}>
            <AlertCircle size={14} />
          </div>
        );
      default:
        return (
          <div className="notification-item-icon" style={{ background: 'linear-gradient(135deg, #334155, #0F172A)' }}>
            <Bell size={14} />
          </div>
        );
    }
  };

  return (
    <header className={`app-header-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-layout">
        {/* Left Column: Brand Logo & Title (Click to return to Tasks) */}
        <div className="navbar-brand-col">
          <button
            onClick={() => setActiveModule('tasks')}
            className="navbar-brand-btn"
            title="Return to Tasks & Schedule"
            type="button"
          >
            <div className="brand-emblem-box">
              <svg width="24" height="12" viewBox="0 0 204 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 76L133 0V24L202 0V70L182 77V53L114 77V50L0 76Z" fill="#FFFFFF"/>
              </svg>
            </div>
            <div className="brand-text-col">
              <div className="brand-title-row">
                <span className="brand-title-text">
                  Winter Arc
                </span>
                <span className="brand-tag-pill">
                  PROTOCOL
                </span>
              </div>
              <span className="brand-subtitle-text">
                Focus & Routine OS
              </span>
            </div>
          </button>
        </div>

        {/* Center Column: Mathematically & Optically Centered Searchbar */}
        <div className="navbar-search-col">
          <div className="searchbar-box">
            <div className="searchbar-icon">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search tasks, routines, or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searchbar-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="searchbar-clear-btn"
                title="Clear search"
                type="button"
              >
                <X size={12} strokeWidth={2.6} />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Clear Action Buttons */}
        <div className="navbar-actions-col">
          {/* Level & XP Gamification Badge */}
          <button
            onClick={() => setIsXpModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all shadow-xs cursor-pointer group"
            title="View XP Level & Rank Progress"
          >
            <div className="flex items-center gap-1">
              <Zap size={13} className="text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black text-slate-900 font-mono">Lv.{levelInfo.level}</span>
            </div>

            <div className="hidden lg:flex flex-col gap-0.5 w-14">
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-[#1867FF] to-[#38BDF8] rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>

            <span className="text-[11px] font-bold text-[#1867FF] hidden xl:inline">
              {levelInfo.rank.title}
            </span>
          </button>

          {/* Notification Bell & Activity Center Flyout */}
          <div className="notification-bell-container" ref={notificationMenuRef}>
            <button
              onClick={toggleNotifications}
              className={`notification-bell-btn ${isNotificationOpen ? 'active' : ''}`}
              title="Notifications & Activity Center"
              aria-label="Notifications"
              type="button"
            >
              <Bell size={18} strokeWidth={2.2} />
              {unreadNotificationsCount > 0 && (
                <span className="notification-count-badge">
                  {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notification Center Popover */}
            {isNotificationOpen && (
              <div className="notification-popover">
                {/* Popover Header */}
                <div className="notification-popover-header">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="notification-popover-title">Activity & Alerts</span>
                    <span className="notification-badge-pill">{notificationsHistory.length}</span>
                  </div>

                  {notificationsHistory.length > 0 && (
                    <button
                      onClick={clearNotificationsHistory}
                      className="notification-clear-btn"
                      title="Clear notification history"
                      type="button"
                    >
                      <Trash2 size={12} />
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                {/* Quick Notification Preview / Test Controls */}
                <div className="notification-test-box">
                  <div className="notification-test-label">
                    <span>Try Notification Types</span>
                    <Sparkles size={12} style={{ color: '#1867FF' }} />
                  </div>
                  <div className="notification-test-chips">
                    <button
                      onClick={() => showToast('+50 XP: Deep Work Completed! ⚡')}
                      className="notification-test-chip"
                      type="button"
                    >
                      ⚡ +50 XP
                    </button>
                    <button
                      onClick={() => showToast('Routine "Cold Plunge & Hydration" checked! ✓')}
                      className="notification-test-chip"
                      type="button"
                    >
                      ✨ Routine
                    </button>
                    <button
                      onClick={() => showToast('🎉 LEVEL UP! You reached Level 3: Arc Vanguard! 🏆')}
                      className="notification-test-chip"
                      type="button"
                    >
                      🏆 Level Up
                    </button>
                    <button
                      onClick={() => showToast('Daily reflection saved to Journal')}
                      className="notification-test-chip"
                      type="button"
                    >
                      📖 Reflection
                    </button>
                  </div>
                </div>

                {/* Notification Feed List */}
                <div className="notification-list custom-scrollbar">
                  {notificationsHistory.length === 0 ? (
                    <div style={{ padding: '32px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#94A3B8' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                        <Bell size={18} />
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#334155' }}>All caught up!</p>
                      <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8' }}>
                        Actions you perform will display notifications here.
                      </p>
                    </div>
                  ) : (
                    notificationsHistory.map((item) => (
                      <div key={item.id} className="notification-item">
                        {renderItemBadge(item.type)}

                        <div className="notification-item-content">
                          <div className="notification-item-top">
                            <span className="notification-item-title">
                              {item.title || 'Notification'}
                            </span>
                            <span className="notification-item-time">
                              {formatRelativeTime(item.timestamp)}
                            </span>
                          </div>
                          <p className="notification-item-msg">
                            {item.message}
                          </p>
                        </div>

                        {item.xp && (
                          <span className="notification-item-xp">
                            +{item.xp} XP
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Sign In Modal Trigger */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-900 transition-all shrink-0 shadow-xs cursor-pointer"
            title="Account & Authentication"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1867FF] to-[#1055E8] text-white flex items-center justify-center font-black text-[10px] overflow-hidden shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span>{user?.name?.[0] || 'A'}</span>
              )}
            </div>
            <span className="hidden sm:inline font-bold text-slate-900">{user?.name || 'Sign In'}</span>
          </button>

          {/* + Add Task Button */}
          <button
            onClick={onOpenTaskModal}
            className="btn-primary-blue text-xs font-bold px-4 py-2 shrink-0"
            title="Add a new task"
          >
            <Plus size={16} strokeWidth={2.8} />
            <span className="inline">New Task</span>
          </button>

          {/* Daily Reflection Journal Button */}
          <button
            onClick={onOpenJournalModal}
            className="btn-secondary-white text-xs font-bold px-3.5 py-2 hidden sm:inline-flex shrink-0"
            title="Open Daily Reflection Journal"
          >
            <BookOpen size={15} className="text-[#1867FF]" />
            <span>Reflection</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetAllData}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors shrink-0"
            title="Reset sample data"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </header>
  );
};
