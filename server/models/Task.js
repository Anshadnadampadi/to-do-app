import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: '10:00 AM'
    },
    timeEnd: {
      type: String,
      default: '11:15 AM'
    },
    timeLabel: {
      type: String,
      default: '10:00 AM'
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    },
    category: {
      type: String,
      enum: [
        'DSA',
        'React',
        'Node.js',
        'AI Engineering',
        'Projects',
        'Reading',
        'Interview Preparation',
        'Gym',
        'Personal',
        'Miscellaneous'
      ],
      default: 'Projects'
    },
    priority: {
      type: String,
      enum: ['Urgent', 'High', 'Medium', 'Low'],
      default: 'High'
    },
    statusBadge: {
      type: String,
      enum: ['In Progress', 'Pending', 'Completed'],
      default: 'In Progress'
    },
    status: {
      type: String,
      enum: ['in-progress', 'pending', 'completed'],
      default: 'in-progress'
    },
    progress: {
      type: Number,
      default: 50,
      min: 0,
      max: 100
    },
    members: [
      {
        name: String,
        avatar: String
      }
    ],
    joinedExtra: {
      type: Number,
      default: 0
    },
    reminder: {
      type: Boolean,
      default: false
    },
    reminderMinutesBefore: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const Task = mongoose.model('Task', taskSchema);
