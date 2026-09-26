# ❄️ Winter Arc

> Track every day. Improve every week. Build your future.

Winter Arc is a personal productivity and career growth platform designed to help developers, students, and professionals manage their learning journey, track progress, build consistency, and achieve long-term goals.

Instead of using multiple apps for tasks, habits, learning progress, project tracking, and journaling, Winter Arc brings everything together in one place.

---

# 🚀 Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Forgot Password
- Password Reset
- Google Authentication (Future)

---

## 📊 Dashboard

A centralized dashboard to monitor overall progress.

### Dashboard Metrics

- Tasks Completed Today
- Current Streak
- Weekly Productivity
- Monthly Productivity
- Total Study Hours
- Active Projects
- Goals Completed
- DSA Progress
- AI Learning Progress

### Visual Analytics

- Weekly Activity Chart
- Monthly Progress Chart
- Task Completion Statistics
- Habit Completion Statistics

---

## ✅ Task Management

Create and manage daily tasks.

### Features

- Create Task
- Update Task
- Delete Task
- Mark Task as Completed
- Task Priority Levels
- Due Dates
- Task Categories
- Search Tasks
- Filter Tasks
- Sort Tasks

### Categories

- DSA
- React
- Node.js
- AI Engineering
- Projects
- Reading
- Interview Preparation
- Gym
- Personal
- Miscellaneous

---

## 🎯 Goal Tracking

Track long-term career objectives.

### Examples

- Become an AI Engineer
- Complete React Roadmap
- Solve 500 LeetCode Problems
- Build 10 Projects
- Learn System Design

### Features

- Create Goal
- Update Goal Progress
- Set Target Date
- Goal Completion Tracking

---

## 🔥 Habit Tracker

Build consistency through daily habits.

### Example Habits

- Wake Up Early
- Gym
- Reading
- Coding
- DSA Practice
- AI Study
- Water Intake

### Features

- Daily Habit Tracking
- Streak Calculation
- Monthly Habit Reports
- Habit Completion Percentage

---

## 📚 DSA Progress Tracker

Track coding practice progress.

### Store

- Problem Name
- Platform
- Difficulty
- Solution Link
- Notes
- Time Taken
- Solved Date

### Supported Platforms

- LeetCode
- HackerRank
- GeeksForGeeks
- CodeChef
- Codeforces

### Analytics

- Easy Solved
- Medium Solved
- Hard Solved
- Weekly Progress
- Monthly Progress

---

## 🤖 AI Learning Tracker

Track AI Engineering learning progress.

### Topics

- Prompt Engineering
- LLM Fundamentals
- RAG
- Embeddings
- Vector Databases
- LangChain
- LangGraph
- Agents
- MCP
- FastAPI
- AI Deployment

### Status Types

- Not Started
- Learning
- Completed

---

## 💻 Project Tracker

Manage personal and professional projects.

### Features

- Project Creation
- Progress Tracking
- GitHub Repository Link
- Live URL
- Notes
- Status Updates

### Example Projects

- Winter Arc
- Starzo
- AI Interview Coach
- Portfolio Website

---

## 📝 Daily Journal

Record daily learning and reflections.

### Journal Template

#### What did I learn today?

#### What did I build today?

#### What challenges did I face?

#### What will I do tomorrow?

### Features

- Daily Entries
- Search Journals
- Journal History
- Reflection Tracking

---

## 📁 File Upload System

Store important resources.

### Upload Types

- PDFs
- Notes
- Screenshots
- Certificates
- Resume
- Project Resources

### Storage

Cloudinary

---

## 🏆 Achievement System

Unlock achievements based on progress.

### Examples

- First Task Completed
- 7 Day Streak
- 30 Day Streak
- 100 LeetCode Problems
- First Project Deployed
- First AI Project Built

---

# 🏗️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Query
- Recharts

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas

## Authentication

- JWT
- bcryptjs

## Storage

- Cloudinary

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```bash
winter-arc/

├── client/
│
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│
│   └── package.json
│
├── server/
│
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── README.md
└── .gitignore
```

---

# 🗄️ Database Collections

```text
users
tasks
habits
goals
projects
journals
achievements
uploads
dsaProgress
aiProgress
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/winter-arc.git
```

```bash
cd winter-arc
```

---

# Frontend Setup

```bash
cd client
npm install
```

Run development server:

```bash
npm run dev
```

---

# Backend Setup

```bash
cd server
npm install
```

Run server:

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

---

# API Modules

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

---

## Tasks

```http
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

---

## Habits

```http
GET /api/habits
POST /api/habits
PUT /api/habits/:id
DELETE /api/habits/:id
```

---

## Goals

```http
GET /api/goals
POST /api/goals
PUT /api/goals/:id
DELETE /api/goals/:id
```

---

## Projects

```http
GET /api/projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id
```

---

## Journal

```http
GET /api/journal
POST /api/journal
PUT /api/journal/:id
DELETE /api/journal/:id
```

---

## Uploads

```http
POST /api/uploads
GET /api/uploads
DELETE /api/uploads/:id
```

---

# 🌐 Deployment

## Frontend Deployment (Vercel)

Build application:

```bash
npm run build
```

Push code to GitHub.

Connect repository to Vercel.

Add environment variables.

Deploy.

---

## Backend Deployment (Render)

Push backend code to GitHub.

Create Web Service on Render.

Add environment variables.

Deploy.

---

## Database Deployment

Create a cluster in MongoDB Atlas.

Whitelist IP:

```text
0.0.0.0/0
```

Connect using:

```env
MONGO_URI=
```

---

# 📈 Future Roadmap

## Version 2

- AI Career Coach
- Resume Analyzer
- AI Task Suggestions
- Interview Preparation Assistant
- Voice Notes
- Calendar Integration
- Notifications
- Mobile App

---

## Version 3

- Team Collaboration
- Mentor Dashboard
- Public Learning Profile
- AI Study Reports
- Productivity Insights
- Smart Recommendations

---

# 🤝 Contributing

Contributions are welcome.

1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Push Changes
5. Open Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Anshad

MERN Stack Developer | AI Engineering Enthusiast

Building systems that transform learning, productivity, and career growth.

---

### Winter Arc Philosophy

> Small improvements every day create extraordinary results over time.