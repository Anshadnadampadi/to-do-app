import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },
    mood: {
      type: String,
      default: '🔥 High Focus'
    },
    productivityScore: {
      type: Number,
      default: 9,
      min: 1,
      max: 10
    },
    // The 4 Core Prompts from README.md
    q1: {
      type: String, // What did I learn today?
      default: ''
    },
    q2: {
      type: String, // What did I build today?
      default: ''
    },
    q3: {
      type: String, // What challenges did I face?
      default: ''
    },
    q4: {
      type: String, // What will I do tomorrow?
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const Journal = mongoose.model('Journal', journalSchema);
