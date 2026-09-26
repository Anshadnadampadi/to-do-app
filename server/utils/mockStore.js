import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Default initial seed data
const defaultStore = {
  user: {
    _id: "user-anshad-1",
    name: "Anshad",
    email: "anshad@winterarc.dev",
    role: "MERN Stack Developer | AI Engineering Enthusiast",
    bio: "Building systems that transform learning, productivity, and career growth.",
    avatar: "/assets/maddox_avatar.jpg",
    streak: 14,
    totalStudyHours: 152,
    weeklyProductivity: 92,
    monthlyProductivity: 88,
    activeProjectsCount: 4,
    goalsCompletedCount: 5
  },

  tasks: [
    {
      _id: "task-1",
      id: "task-1",
      title: "Design Wireframes For Task",
      time: "10:00 AM",
      timeEnd: "11:15 AM",
      timeLabel: "10:00 AM",
      date: "2025-11-27",
      category: "Projects",
      statusBadge: "In Progress",
      status: "in-progress",
      priority: "High",
      progress: 75,
      members: [{ name: "Anshad", avatar: "/assets/maddox_avatar.jpg" }],
      joinedExtra: 1,
      description: "Build clean mobile wireframes and interaction specs in Figma."
    },
    {
      _id: "task-2",
      id: "task-2",
      title: "Review User Feedback",
      time: "11:30 AM",
      timeEnd: "12:45 PM",
      timeLabel: "11:30 AM",
      date: "2025-11-27",
      category: "Interview Preparation",
      statusBadge: "Pending",
      status: "in-progress",
      priority: "Medium",
      progress: 40,
      members: [{ name: "Anshad", avatar: "/assets/maddox_avatar.jpg" }],
      joinedExtra: 1,
      description: "Analyze qualitative UX interview notes and feature sentiment."
    },
    {
      _id: "task-3",
      id: "task-3",
      title: "Finalize UI Kit",
      time: "1:00 PM",
      timeEnd: "2:30 PM",
      timeLabel: "1:00 PM",
      date: "2025-11-27",
      category: "React",
      statusBadge: "In Progress",
      status: "in-progress",
      priority: "Urgent",
      progress: 60,
      members: [{ name: "Anshad", avatar: "/assets/maddox_avatar.jpg" }],
      joinedExtra: 0,
      description: "Export design tokens, typography scales, and button component variants."
    }
  ],

  habits: [
    { _id: "h-1", id: "h-1", name: "Wake Up Early (5:30 AM)", category: "Personal", streak: 14, completedToday: true, history: [true, true, true, true, true, true, true] },
    { _id: "h-2", id: "h-2", name: "Gym & Strength Training", category: "Gym", streak: 10, completedToday: true, history: [true, false, true, true, true, true, true] },
    { _id: "h-3", id: "h-3", name: "Tech & Book Reading (30m)", category: "Reading", streak: 16, completedToday: true, history: [true, true, true, true, true, true, true] },
    { _id: "h-4", id: "h-4", name: "Deep Work Coding (2h+)", category: "Projects", streak: 29, completedToday: true, history: [true, true, true, true, true, true, true] },
    { _id: "h-5", id: "h-5", name: "DSA Practice (1-2 Problems)", category: "DSA", streak: 15, completedToday: true, history: [true, true, true, true, true, true, true] },
    { _id: "h-6", id: "h-6", name: "AI Engineering Study (1h)", category: "AI Engineering", streak: 12, completedToday: true, history: [true, true, true, true, true, true, true] },
    { _id: "h-7", id: "h-7", name: "Water Intake (3L Hydration)", category: "Personal", streak: 20, completedToday: true, history: [true, true, true, true, true, true, true] }
  ],

  goals: [
    {
      _id: "goal-1",
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
      _id: "goal-2",
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
      _id: "goal-3",
      id: "goal-3",
      title: "Complete Full React & Next.js Roadmap",
      category: "React",
      targetDate: "Dec 2025",
      progress: 95,
      milestones: [
        { text: "Server Components & Server Actions", done: true },
        { text: "React 19 Hooks & Compiler optimization", done: true },
        { text: "Design system architecture", done: true }
      ]
    }
  ],

  projects: [
    {
      _id: "proj-1",
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
      _id: "proj-2",
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
      _id: "proj-3",
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
      _id: "proj-4",
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
  ],

  journals: [
    {
      _id: "j-1",
      id: "j-1",
      date: "Nov 27, 2025",
      mood: "🔥 High Focus",
      productivityScore: 9,
      q1: "Learned Model Context Protocol (MCP) architectures and structured tool-calling loops in agents.",
      q2: "Designed and implemented the clean iOS-inspired vertical timeline and routine checklist.",
      q3: "Tackled CSS Grid centering calculations for asymmetric header layouts.",
      q4: "Complete the Graph DFS daily problem and finalize the project resource vault."
    }
  ],

  dsa: {
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
      { id: "dsa-1", name: "Binary Tree Maximum Path Sum", difficulty: "Hard", platform: "LeetCode", timeTaken: "28m", date: "Nov 27, 2025", notes: "Post-order traversal" },
      { id: "dsa-2", name: "Course Schedule II", difficulty: "Medium", platform: "LeetCode", timeTaken: "18m", date: "Nov 26, 2025", notes: "Kahn's Topological Sort" }
    ]
  },

  aiTopics: [
    { id: "ai-1", name: "Prompt Engineering & Few-Shot Reasoning", status: "Completed", progress: 100 },
    { id: "ai-2", name: "LLM Fundamentals & Attention Mechanisms", status: "Completed", progress: 100 },
    { id: "ai-3", name: "RAG Architecture & Hybrid Search", status: "Completed", progress: 100 },
    { id: "ai-4", name: "Dense Embeddings & Dimensionality Reduction", status: "Completed", progress: 100 },
    { id: "ai-5", name: "Vector Databases (Pinecone, Chroma, Qdrant)", status: "Completed", progress: 100 },
    { id: "ai-6", name: "LangChain Orchestration & Memory Systems", status: "Learning", progress: 75 },
    { id: "ai-7", name: "LangGraph Stateful Multi-Agent Loops", status: "Learning", progress: 65 },
    { id: "ai-8", name: "Autonomous AI Agents & Tool Calling", status: "Learning", progress: 60 },
    { id: "ai-9", name: "Model Context Protocol (MCP) Client & Server", status: "Learning", progress: 50 },
    { id: "ai-10", name: "FastAPI Production Backend for AI Serving", status: "Learning", progress: 60 },
    { id: "ai-11", name: "AI Deployment, Tracing & Evaluation (LangSmith)", status: "Not Started", progress: 0 }
  ],

  uploads: [
    { _id: "up-1", id: "up-1", title: "FullStack_Developer_Resume_2025.pdf", type: "Resume", size: "184 KB", date: "Nov 26, 2025", url: "#" },
    { _id: "up-2", id: "up-2", title: "System_Design_Distributed_Systems.pdf", type: "PDFs", size: "2.4 MB", date: "Nov 25, 2025", url: "#" },
    { _id: "up-3", id: "up-3", title: "AWS_Solutions_Architect_Badge.png", type: "Certificates", size: "420 KB", date: "Nov 24, 2025", url: "#" },
    { _id: "up-4", id: "up-4", title: "Winter_Arc_Design_Tokens.json", type: "Project Resources", size: "48 KB", date: "Nov 27, 2025", url: "#" }
  ],

  achievements: [
    { _id: "ach-1", id: "ach-1", title: "First Task Completed", desc: "Completed your first productivity task.", unlocked: true, unlockedAt: "Nov 20, 2025", icon: "CheckCircle2" },
    { _id: "ach-2", id: "ach-2", title: "7 Day Streak", desc: "Maintained an unbroken daily focus streak for one week.", unlocked: true, unlockedAt: "Nov 22, 2025", icon: "Flame" },
    { _id: "ach-3", id: "ach-3", title: "30 Day Streak", desc: "Completed a full month of the Winter Arc discipline.", unlocked: true, unlockedAt: "Nov 25, 2025", icon: "Award" },
    { _id: "ach-4", id: "ach-4", title: "100 LeetCode Problems", desc: "Solved over 100 algorithm and data structure problems.", unlocked: true, unlockedAt: "Nov 24, 2025", icon: "Code2" },
    { _id: "ach-5", id: "ach-5", title: "First Project Deployed", desc: "Shipped a full-stack project live to production.", unlocked: true, unlockedAt: "Nov 26, 2025", icon: "Rocket" },
    { _id: "ach-6", id: "ach-6", title: "First AI Project Built", desc: "Developed and connected an AI agent with tool-calling capabilities.", unlocked: true, unlockedAt: "Nov 27, 2025", icon: "Bot" }
  ]
};

export let mockStore = JSON.parse(JSON.stringify(defaultStore));

// Initialize and restore persisted data from disk if available
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(STORE_FILE)) {
    const raw = fs.readFileSync(STORE_FILE, 'utf-8');
    if (raw && raw.trim()) {
      const parsed = JSON.parse(raw);
      mockStore = { ...defaultStore, ...parsed };
      console.log(`[Storage] Restored persistent store from ${STORE_FILE}`);
    }
  } else {
    fs.writeFileSync(STORE_FILE, JSON.stringify(defaultStore, null, 2), 'utf-8');
    console.log(`[Storage] Initialized persistent store file at ${STORE_FILE}`);
  }
} catch (e) {
  console.warn(`[Storage] Warning initializing store file: ${e.message}`);
}

// Persist current state to disk
export const saveStore = () => {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(mockStore, null, 2), 'utf-8');
  } catch (e) {
    console.error(`[Storage] Error saving to store.json: ${e.message}`);
  }
};
