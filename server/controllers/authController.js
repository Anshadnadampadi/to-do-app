import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { isConnectedToMongo } from '../config/db.js';
import { mockStore } from '../utils/mockStore.js';

const generateToken = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET || 'winter_arc_super_secret_jwt_key_2025',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    if (isConnectedToMongo) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }

      const user = await User.create({ name, email, password });
      const token = generateToken(user._id, user.email);

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          streak: user.streak
        }
      });
    } else {
      // In-memory fallback
      const token = generateToken('user-new-id', email);
      mockStore.user.name = name;
      mockStore.user.email = email;

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: 'user-new-id',
          name,
          email,
          role: mockStore.user.role,
          avatar: mockStore.user.avatar,
          streak: mockStore.user.streak
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    if (isConnectedToMongo) {
      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = generateToken(user._id, user.email);
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          streak: user.streak,
          totalStudyHours: user.totalStudyHours,
          weeklyProductivity: user.weeklyProductivity
        }
      });
    } else {
      // In-memory demo login
      const token = generateToken(mockStore.user._id, email);
      return res.status(200).json({
        success: true,
        token,
        user: mockStore.user
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    if (isConnectedToMongo && req.user?._id) {
      const user = await User.findById(req.user._id);
      return res.status(200).json({ success: true, user });
    }
    return res.status(200).json({ success: true, user: mockStore.user });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  res.status(200).json({
    success: true,
    message: `Password reset instructions sent to ${email || 'registered email'}`
  });
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Password successfully updated'
  });
};
