import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    unlocked: {
      type: Boolean,
      default: false
    },
    unlockedAt: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: 'Award'
    }
  },
  {
    timestamps: true
  }
);

export const Achievement = mongoose.model('Achievement', achievementSchema);
