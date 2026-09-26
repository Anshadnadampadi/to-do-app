import { Goal } from '../models/Goal.js';
import { isConnectedToMongo } from '../config/db.js';
import { mockStore, saveStore } from '../utils/mockStore.js';

// @desc    Get all long-term goals
// @route   GET /api/goals
// @access  Private / Public in dev
export const getGoals = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      const goals = await Goal.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: goals.length, data: goals });
    }
    return res.status(200).json({ success: true, count: mockStore.goals.length, data: mockStore.goals });
  } catch (error) {
    next(error);
  }
};

// @desc    Create goal
// @route   POST /api/goals
// @access  Private
export const createGoal = async (req, res, next) => {
  try {
    const { title, category, targetDate, milestones } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Goal title is required' });
    }

    const formattedMilestones = (milestones || ['Milestone 1']).map(m =>
      typeof m === 'string' ? { text: m, done: false } : m
    );

    const goalData = {
      title,
      category: category || 'Projects',
      targetDate: targetDate || '2026',
      progress: 0,
      milestones: formattedMilestones
    };

    if (isConnectedToMongo) {
      const goal = await Goal.create({ ...goalData, user: req.user?._id });
      return res.status(201).json({ success: true, data: goal });
    } else {
      const newGoal = { _id: `goal-${Date.now()}`, id: `goal-${Date.now()}`, ...goalData };
      mockStore.goals.unshift(newGoal);
      saveStore();
      return res.status(201).json({ success: true, data: newGoal });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update goal or milestone
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const goal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
      if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
      return res.status(200).json({ success: true, data: goal });
    } else {
      const index = mockStore.goals.findIndex(g => g._id === id || g.id === id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Goal not found' });
      mockStore.goals[index] = { ...mockStore.goals[index], ...req.body };
      saveStore();
      return res.status(200).json({ success: true, data: mockStore.goals[index] });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      await Goal.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Goal deleted' });
    } else {
      mockStore.goals = mockStore.goals.filter(g => g._id !== id && g.id !== id);
      saveStore();
      return res.status(200).json({ success: true, message: 'Goal deleted' });
    }
  } catch (error) {
    next(error);
  }
};
