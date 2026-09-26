// Gamification, XP & Level-Up System for Winter Arc

export const XP_REWARDS = {
  TASK_COMPLETE: 50,
  ROUTINE_COMPLETE: 30,
  HABIT_TODAY: 40,
  DSA_PROBLEM: 75,
  AI_TOPIC: 80,
  GOAL_MILESTONE: 100,
  JOURNAL_REFLECTION: 60,
  RESOURCE_UPLOAD: 25
};

export const RANKS = [
  { minLevel: 1, title: 'Winter Novice', icon: '❄️', color: '#0EA5E9', desc: 'Starting your Winter Arc discipline journey' },
  { minLevel: 3, title: 'Focus Apprentice', icon: '⚡', color: '#0284C7', desc: 'Building consistent daily study habits' },
  { minLevel: 5, title: 'Routine Specialist', icon: '🛡️', color: '#2563EB', desc: 'Maintaining unbroken routines and task discipline' },
  { minLevel: 7, title: 'Winter Arc Warrior', icon: '⚔️', color: '#7C3AED', desc: 'High performance across coding, habits, and projects' },
  { minLevel: 10, title: 'Discipline Master', icon: '💎', color: '#059669', desc: 'Flawless execution and mastery of engineering goals' },
  { minLevel: 15, title: 'Grand Sovereign', icon: '👑', color: '#D97706', desc: 'Legendary consistency and completed transformation' }
];

export const calculateLevel = (totalXp = 2850) => {
  const XP_PER_LEVEL = 500;
  const xp = Math.max(0, Number(totalXp) || 0);
  const level = Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
  const currentLevelBaseXp = (level - 1) * XP_PER_LEVEL;
  const currentLevelProgress = xp - currentLevelBaseXp;
  const progressPercent = Math.min(100, Math.round((currentLevelProgress / XP_PER_LEVEL) * 100));

  let currentRank = RANKS[0];
  let nextRank = RANKS[1];

  for (let i = 0; i < RANKS.length; i++) {
    if (level >= RANKS[i].minLevel) {
      currentRank = RANKS[i];
      nextRank = RANKS[i + 1] || null;
    }
  }

  return {
    level,
    totalXp: xp,
    currentLevelProgress,
    nextLevelXp: XP_PER_LEVEL,
    progressPercent,
    rank: currentRank,
    nextRank,
    xpNeeded: XP_PER_LEVEL - currentLevelProgress
  };
};
