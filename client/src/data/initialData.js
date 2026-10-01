const CURRENT_YEAR = new Date().getFullYear();
const TODAY_FORMATTED = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
const SHORT_DATE = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const TODAY_ISO = new Date().toISOString().split('T')[0];

export const INITIAL_USER = {
  name: "Anshad",
  greetingPrefix: "Hello,",
  role: "MERN Stack Developer | AI Engineering Enthusiast",
  bio: "Building systems that transform learning, productivity, and career growth.",
  email: "anshad@winterarc.dev",
  avatar: "/assets/maddox_avatar.jpg",
  streak: 14,
  todayDateDisplay: TODAY_FORMATTED,
  todayMeetingsCount: 0,
  weeklyProductivity: 92,
  monthlyProductivity: 88,
  totalStudyHours: 152,
  activeProjectsCount: 4,
  goalsCompletedCount: 5,
  xp: 2850,
  level: 6
};

// Routine Task Box Templates (Screen 1 from design screenshot)
export const INITIAL_ROUTINE_BOX = [
  { id: "routine-1", title: "Clean Bathroom", iconName: "Sparkles", category: "Personal", time: "8:00 AM", isCompleted: false },
  { id: "routine-2", title: "Brush Teeth", iconName: "Smile", category: "Personal", time: "8:15 AM", isCompleted: true },
  { id: "routine-3", title: "Clean Room", iconName: "Home", category: "Personal", time: "8:30 AM", isCompleted: false },
  { id: "routine-4", title: "Rinse Mouth", iconName: "Droplet", category: "Personal", time: "8:45 AM", isCompleted: true },
  { id: "routine-5", title: "Clean The Table", iconName: "Coffee", category: "Personal", time: "9:00 AM", isCompleted: false },
  { id: "routine-6", title: "Home Work", iconName: "BookOpen", category: "Reading", time: "9:30 AM", isCompleted: false },
  { id: "routine-7", title: "Get Dressed", iconName: "Sun", category: "Personal", time: "9:45 AM", isCompleted: true },
  { id: "routine-8", title: "Make Breakfast", iconName: "Utensils", category: "Personal", time: "10:00 AM", isCompleted: true }
];

// Timeline Tasks (Starts empty so you can add your tasks from scratch)
export const INITIAL_TASKS = [];

// Event Logs (Screen 2 from design screenshot)
export const INITIAL_EVENT_LOGS = [
  {
    id: "event-1",
    dayLabel: "Fri",
    dateNumber: 25,
    title: "Vacation",
    badgeNumber: 1,
    description: "Bonnie and I stayed here in January",
    commentsCount: 6,
    timeDurationHours: 23,
    members: [
      { name: "Bonnie", avatar: "/avatars/avatar_sarah.jpg" },
      { name: "Anshad", avatar: "/assets/maddox_avatar.jpg" }
    ],
    joinedExtra: 1
  },
  {
    id: "event-2",
    dayLabel: "Sat",
    dateNumber: 26,
    title: "Conference",
    badgeNumber: 2,
    description: "Attended a workshop on design thinking",
    commentsCount: 8,
    timeDurationHours: 25,
    members: [
      { name: "Marcus Lee", avatar: "/avatars/avatar_marcus.jpg" },
      { name: "Sarah Chen", avatar: "/avatars/avatar_sarah.jpg" }
    ],
    joinedExtra: 2
  },
  {
    id: "event-3",
    dayLabel: "Sun",
    dateNumber: 27,
    title: "Hiking",
    badgeNumber: 3,
    description: "Explored the local trails with friends",
    commentsCount: 4,
    timeDurationHours: 12,
    members: [
      { name: "Anshad", avatar: "/assets/maddox_avatar.jpg" },
      { name: "Sarah Chen", avatar: "/avatars/avatar_sarah.jpg" }
    ],
    joinedExtra: 0
  }
];

// Calendar Days (matching the row in the screenshot)
export const CALENDAR_DAYS = [
  { dayName: "Fri", dateNumber: 25, isSelected: false },
  { dayName: "Sat", dateNumber: 25, isSelected: false },
  { dayName: "Sun", dateNumber: 26, isSelected: false },
  { dayName: "Mon", dateNumber: 27, isSelected: true },
  { dayName: "Tue", dateNumber: 28, isSelected: false },
  { dayName: "Tue", dateNumber: 28, isSelected: false },
  { dayName: "Wed", dateNumber: 29, isSelected: false }
];

// Categories strictly from README.md
export const CATEGORIES = [
  "All",
  "DSA",
  "React",
  "Node.js",
  "AI Engineering",
  "Projects",
  "Reading",
  "Interview Preparation",
  "Gym",
  "Personal",
  "Miscellaneous"
];

// Daily Habits from README.md
export const INITIAL_HABITS = [
  { id: "h-1", name: "Wake Up Early (5:30 AM)", category: "Personal", streak: 14, completedToday: true, history: [true, true, true, true, true, true, true] },
  { id: "h-2", name: "Gym & Strength Training", category: "Gym", streak: 10, completedToday: true, history: [true, false, true, true, true, true, true] },
  { id: "h-3", name: "Tech & Book Reading (30m)", category: "Reading", streak: 16, completedToday: true, history: [true, true, true, true, true, true, true] },
  { id: "h-4", name: "Deep Work Coding (2h+)", category: "Projects", streak: 29, completedToday: true, history: [true, true, true, true, true, true, true] },
  { id: "h-5", name: "DSA Practice (1-2 Problems)", category: "DSA", streak: 15, completedToday: true, history: [true, true, true, true, true, true, true] },
  { id: "h-6", name: "AI Engineering Study (1h)", category: "AI Engineering", streak: 12, completedToday: true, history: [true, true, true, true, true, true, true] },
  { id: "h-7", name: "Water Intake (3L Hydration)", category: "Personal", streak: 20, completedToday: true, history: [true, true, true, true, true, true, true] }
];

// DSA Progress Tracker from README.md
export const INITIAL_DSA = {
  totalSolved: 342,
  easy: 180,
  medium: 135,
  hard: 27,
  platforms: [
    { name: "LeetCode", count: 268 },
    { name: "GeeksForGeeks", count: 42 },
    { name: "Codeforces", count: 18 },
    { name: "HackerRank", count: 14 }
  ],
  recentProblems: [
    { id: "dsa-1", name: "Binary Tree Maximum Path Sum", difficulty: "Hard", platform: "LeetCode", timeTaken: "28m", date: SHORT_DATE, notes: "Post-order traversal, track max path sum across subtrees" },
    { id: "dsa-2", name: "Course Schedule II", difficulty: "Medium", platform: "LeetCode", timeTaken: "18m", date: SHORT_DATE, notes: "Kahn's Topological Sort algorithm practice" },
    { id: "dsa-3", name: "LRU Cache Implementation", difficulty: "Medium", platform: "LeetCode", timeTaken: "22m", date: SHORT_DATE, notes: "Doubly Linked List + HashMap combination" },
    { id: "dsa-4", name: "Trapping Rain Water", difficulty: "Hard", platform: "LeetCode", timeTaken: "35m", date: SHORT_DATE, notes: "Two pointers approach O(1) space" }
  ]
};

// AI Learning Roadmap Topics strictly from README.md
export const INITIAL_AI_TOPICS = [
  { id: "ai-1", name: "Prompt Engineering & Few-Shot Reasoning", status: "Completed", progress: 100 },
  { id: "ai-2", name: "LLM Fundamentals & Attention Mechanisms", status: "Completed", progress: 100 },
  { id: "ai-3", name: "RAG Architecture & Hybrid Search", status: "Completed", progress: 100 },
  { id: "ai-4", name: "Dense Embeddings & Dimensionality Reduction", status: "Completed", progress: 100 },
  { id: "ai-5", name: "Vector Databases (Pinecone, Chroma, Qdrant)", status: "Completed", progress: 100 },
  { id: "ai-6", name: "LangChain Orchestration & Memory Systems", status: "Learning", progress: 75 },
  { id: "ai-7", name: "LangGraph Stateful Multi-Agent Loops", status: "Learning", progress: 65 },
  { id: "ai-8", name: "Autonomous AI Agents & Tool Calling", status: "Learning", progress: 60 },
  { id: "ai-9", name: "Model Context Protocol (MCP) Client & Server", status: "Learning", progress: 50 },
  { id: "ai-10", name: "FastAPI Production Backend for AI Serving", status: "Not Started", progress: 0 },
  { id: "ai-11", name: "AI Deployment, Tracing & Evaluation (LangSmith)", status: "Not Started", progress: 0 }
];

// Long-Term Career Goals from README.md
export const INITIAL_GOALS = [
  {
    id: "goal-1",
    title: "Become an AI Engineer",
    category: "AI Engineering",
    targetDate: "March 2026",
    progress: 72,
    milestones: [
      { text: "Master LLM fundamentals & Prompting", done: true },
      { text: "Build production RAG with Vector DB", done: true },
      { text: "Deploy LangGraph autonomous agent system", done: false },
      { text: "Integrate Model Context Protocol (MCP)", done: false }
    ]
  },
  {
    id: "goal-2",
    title: "Solve 500 LeetCode Problems",
    category: "DSA",
    targetDate: "Jan 2026",
    progress: 68,
    milestones: [
      { text: "Complete Blind 75 list", done: true },
      { text: "Solve 150 Medium Graph & Tree problems", done: true },
      { text: "Master Dynamic Programming patterns", done: false },
      { text: "Complete 50 Hard contest problems", done: false }
    ]
  },
  {
    id: "goal-3",
    title: "Complete Full React & Next.js Roadmap",
    category: "React",
    targetDate: `Dec ${CURRENT_YEAR}`,
    progress: 95,
    milestones: [
      { text: "Server Components & Server Actions", done: true },
      { text: "React 19 Hooks & Compiler optimization", done: true },
      { text: "Design system architecture", done: true }
    ]
  },
  {
    id: "goal-4",
    title: "Build & Deploy 10 Full-Stack Applications",
    category: "Projects",
    targetDate: "Feb 2026",
    progress: 60,
    milestones: [
      { text: "Deploy Winter Arc platform", done: true },
      { text: "Deploy Starzo production SaaS", done: true },
      { text: "Deploy AI Interview Coach", done: false }
    ]
  },
  {
    id: "goal-5",
    title: "Learn Scalable System Design",
    category: "Interview Preparation",
    targetDate: "April 2026",
    progress: 45,
    milestones: [
      { text: "Load balancing & horizontal scaling", done: true },
      { text: "Caching strategies & Redis pub/sub", done: true },
      { text: "Sharding & distributed databases", done: false }
    ]
  }
];

// Project Tracker strictly from README.md
export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    name: "Winter Arc",
    description: "Personal productivity, task & career growth tracking platform.",
    category: "Full Stack",
    progress: 92,
    status: "Active",
    githubUrl: "https://github.com/anshad/winter-arc",
    liveUrl: "https://winterarc.dev",
    techStack: ["React 19", "Vite", "Node.js", "Express", "TailwindCSS"]
  },
  {
    id: "proj-2",
    name: "Starzo",
    description: "Production SaaS product management platform for engineering teams.",
    category: "Full Stack",
    progress: 85,
    status: "Active",
    githubUrl: "https://github.com/anshad/starzo",
    liveUrl: "https://starzo.app",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"]
  },
  {
    id: "proj-3",
    name: "AI Interview Coach",
    description: "Interactive mock interview agent with speech analysis and automated feedback.",
    category: "AI Engineering",
    progress: 65,
    status: "In Development",
    githubUrl: "https://github.com/anshad/ai-interview-coach",
    liveUrl: "https://interview-coach-ai.vercel.app",
    techStack: ["LangChain", "FastAPI", "OpenAI Whisper", "React"]
  },
  {
    id: "proj-4",
    name: "Portfolio Website",
    description: "Clean modern portfolio featuring interactive projects and engineering blog.",
    category: "Frontend",
    progress: 100,
    status: "Completed",
    githubUrl: "https://github.com/anshad/portfolio",
    liveUrl: "https://anshad.dev",
    techStack: ["React", "Vite", "Framer Motion"]
  }
];

// Daily Journal strictly matching README.md 4 prompts
export const INITIAL_JOURNALS = [
  {
    id: "j-1",
    date: SHORT_DATE,
    mood: "🔥 High Focus",
    productivityScore: 9,
    q1: "Learned Model Context Protocol (MCP) architectures and structured tool-calling loops in agents.",
    q2: "Designed and implemented the clean iOS-inspired vertical timeline and routine checklist.",
    q3: "Tackled CSS Grid centering calculations for asymmetric header layouts.",
    q4: "Complete the Graph DFS daily problem and finalize the project resource vault."
  },
  {
    id: "j-2",
    date: SHORT_DATE,
    mood: "⚡ Productive Flow",
    productivityScore: 10,
    q1: "Deep-dived into post-order traversal patterns for tree maximum path sums.",
    q2: "Built authentication flows and protected route guards in Express and JWT.",
    q3: "Resolved state synchronization across browser LocalStorage sessions.",
    q4: "Deploy responsive mobile views and polish button contrast."
  }
];

// Achievement System strictly from README.md
export const INITIAL_ACHIEVEMENTS = [
  { id: "ach-1", title: "First Task Completed", desc: "Completed your first productivity task.", unlocked: true, unlockedAt: SHORT_DATE, icon: "CheckCircle2" },
  { id: "ach-2", title: "7 Day Streak", desc: "Maintained an unbroken daily focus streak for one week.", unlocked: true, unlockedAt: SHORT_DATE, icon: "Flame" },
  { id: "ach-3", title: "30 Day Streak", desc: "Completed a full month of the Winter Arc discipline.", unlocked: true, unlockedAt: SHORT_DATE, icon: "Award" },
  { id: "ach-4", title: "100 LeetCode Problems", desc: "Solved over 100 algorithm and data structure problems.", unlocked: true, unlockedAt: SHORT_DATE, icon: "Code2" },
  { id: "ach-5", title: "First Project Deployed", desc: "Shipped a full-stack project live to production.", unlocked: true, unlockedAt: SHORT_DATE, icon: "Rocket" },
  { id: "ach-6", title: "First AI Project Built", desc: "Developed and connected an AI agent with tool-calling capabilities.", unlocked: true, unlockedAt: SHORT_DATE, icon: "Bot" },
  { id: "ach-7", title: "500 Problems Master", desc: "Achieve the 500 solved coding problems milestone.", unlocked: false, unlockedAt: null, icon: "Trophy" }
];

// Resource Vault / File Uploads from README.md
export const INITIAL_UPLOADS = [
  { id: "up-1", title: `FullStack_Developer_Resume_${CURRENT_YEAR}.pdf`, type: "Resume", size: "184 KB", date: SHORT_DATE, url: "#" },
  { id: "up-2", title: "System_Design_Distributed_Systems.pdf", type: "PDFs", size: "2.4 MB", date: SHORT_DATE, url: "#" },
  { id: "up-3", title: "AWS_Solutions_Architect_Badge.png", type: "Certificates", size: "420 KB", date: SHORT_DATE, url: "#" },
  { id: "up-4", title: "Winter_Arc_Design_Tokens.json", type: "Project Resources", size: "48 KB", date: SHORT_DATE, url: "#" }
];

// Weekly Analytics for Visual Charts in Dashboard (from README.md)
export const WEEKLY_ANALYTICS_DATA = [
  { day: "Mon", tasks: 8, studyHours: 5.5, habitRate: 100 },
  { day: "Tue", tasks: 7, studyHours: 5.0, habitRate: 86 },
  { day: "Wed", tasks: 9, studyHours: 6.5, habitRate: 100 },
  { day: "Thu", tasks: 6, studyHours: 4.5, habitRate: 71 },
  { day: "Fri", tasks: 8, studyHours: 5.0, habitRate: 100 },
  { day: "Sat", tasks: 5, studyHours: 3.5, habitRate: 86 },
  { day: "Sun", tasks: 7, studyHours: 4.5, habitRate: 100 }
];
