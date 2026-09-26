import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, 'Goal title is required'],
      trim: true
    },
    category: {
      type: String,
      default: 'Projects'
    },
    targetDate: {
      type: String,
      default: 'March 2026'
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    milestones: [milestoneSchema]
  },
  {
    timestamps: true
  }
);

export const Goal = mongoose.model('Goal', goalSchema);
