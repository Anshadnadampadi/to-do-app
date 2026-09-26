import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CleanNavbar } from './components/CleanNavbar';
import { ModuleNavRibbon } from './components/ModuleNavRibbon';
import { ResponsiveWebDashboard } from './views/ResponsiveWebDashboard';
import { ViewAnalytics } from './views/ViewAnalytics';
import { ViewDsaAi } from './views/ViewDsaAi';
import { ViewGoalsProjects } from './views/ViewGoalsProjects';
import { ViewHabits } from './views/ViewHabits';
import { ViewJournal } from './views/ViewJournal';
import { ViewVaultAchievements } from './views/ViewVaultAchievements';
import { TaskModal } from './components/TaskModal';
import { JournalModal } from './components/JournalModal';
import { AuthModal } from './components/AuthModal';
import { XpModal } from './components/XpModal';
import { NotificationToast } from './components/NotificationToast';

const MainApp = () => {
  const {
    activeModule,
    isTaskModalOpen,
    setIsTaskModalOpen,
    isJournalModalOpen,
    setIsJournalModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isXpModalOpen,
    setIsXpModalOpen,
    notificationToast,
    setNotificationToast
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Top Sticky Navbar */}
      <CleanNavbar
        onOpenTaskModal={() => setIsTaskModalOpen(true)}
        onOpenJournalModal={() => setIsJournalModalOpen(true)}
      />

      {/* Module Navigation Ribbon (All README Options) */}
      <ModuleNavRibbon />

      {/* Floating Dynamic Island Notification Toast */}
      <NotificationToast
        toast={notificationToast}
        onDismiss={() => setNotificationToast(null)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        {activeModule === 'tasks' && (
          <ResponsiveWebDashboard
            onOpenTaskModal={() => setIsTaskModalOpen(true)}
            onOpenJournalModal={() => setIsJournalModalOpen(true)}
          />
        )}

        {activeModule !== 'tasks' && (
          <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-6">
            {activeModule === 'analytics' && (
              <ViewAnalytics
                onOpenTaskModal={() => setIsTaskModalOpen(true)}
                onOpenJournalModal={() => setIsJournalModalOpen(true)}
              />
            )}
            {activeModule === 'dsa-ai' && <ViewDsaAi />}
            {activeModule === 'goals-projects' && <ViewGoalsProjects />}
            {activeModule === 'habits' && <ViewHabits />}
            {activeModule === 'journal' && <ViewJournal />}
            {activeModule === 'vault' && <ViewVaultAchievements />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-slate-200/80 bg-white text-center text-xs text-slate-400 flex flex-col items-center gap-1">
        <p className="font-semibold text-slate-700">
          Winter Arc • Track every day. Improve every week. Build your future.
        </p>
        <p className="text-[11px] text-slate-400">
          Tasks • DSA Progress • AI Engineering Roadmap • Career Goals • Habits • Reflections • Vault
        </p>
      </footer>

      {/* Global Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
      <JournalModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <XpModal
        isOpen={isXpModalOpen}
        onClose={() => setIsXpModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
