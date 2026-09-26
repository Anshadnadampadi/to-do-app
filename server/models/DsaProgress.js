import mongoose from 'mongoose';

const dsaProblemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['LeetCode', 'HackerRank', 'GeeksForGeeks', 'CodeChef', 'Codeforces', 'Other'],
    default: 'LeetCode'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  timeTaken: {
    type: String,
    default: '20m'
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  },
  notes: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: '#'
  }
});

const dsaProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    },
    totalSolved: {
      type: Number,
      default: 0
    },
    easy: {
      type: Number,
      default: 0
    },
    medium: {
      type: Number,
      default: 0
    },
    hard: {
      type: Number,
      default: 0
    },
    platforms: [
      {
        name: String,
        count: Number
      }
    ],
    recentProblems: [dsaProblemSchema]
  },
  {
    timestamps: true
  }
);

export const DsaProgress = mongoose.model('DsaProgress', dsaProgressSchema);
