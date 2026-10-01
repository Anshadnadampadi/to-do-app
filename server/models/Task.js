import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.Mixed,
      default: null
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
      default: 'Projects'
    },
    priority: {
      type: String,
      default: 'High'
    },
    statusBadge: {
      type: String,
      default: 'In Progress'
    },
    status: {
      type: String,
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
