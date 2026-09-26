import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['PDFs', 'Notes', 'Screenshots', 'Certificates', 'Resume', 'Project Resources', 'Other'],
      default: 'PDFs'
    },
    size: {
      type: String,
      default: '500 KB'
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    },
    url: {
      type: String,
      default: '#'
    }
  },
  {
    timestamps: true
  }
);

export const Upload = mongoose.model('Upload', uploadSchema);
