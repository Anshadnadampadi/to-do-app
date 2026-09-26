import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      default: 'MERN Stack Developer | AI Engineering Enthusiast'
    },
    bio: {
      type: String,
      default: 'Building systems that transform learning, productivity, and career growth.'
    },
    avatar: {
      type: String,
      default: '/assets/maddox_avatar.jpg'
    },
    streak: {
      type: Number,
      default: 14
    },
    totalStudyHours: {
      type: Number,
      default: 152
    },
    weeklyProductivity: {
      type: Number,
      default: 92
    },
    monthlyProductivity: {
      type: Number,
      default: 88
    },
    activeProjectsCount: {
      type: Number,
      default: 4
    },
    goalsCompletedCount: {
      type: Number,
      default: 5
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
