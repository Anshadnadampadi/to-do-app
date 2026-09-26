import mongoose from 'mongoose';

const aiTopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Not Started', 'Learning', 'Completed'],
    default: 'Not Started'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

const aiProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    },
    topics: [aiTopicSchema]
  },
  {
    timestamps: true
  }
);

export const AiProgress = mongoose.model('AiProgress', aiProgressSchema);
