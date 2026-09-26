import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, 'Habit name is required'],
      trim: true
    },
    category: {
      type: String,
      default: 'Personal'
    },
    streak: {
      type: Number,
      default: 0
    },
    completedToday: {
      type: Boolean,
      default: false
    },
    history: {
      type: [Boolean],
      default: [false, false, false, false, false, false, false]
    }
  },
  {
    timestamps: true
  }
);

export const Habit = mongoose.model('Habit', habitSchema);
