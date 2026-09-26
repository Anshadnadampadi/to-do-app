import { Habit } from '../models/Habit.js';
import { isConnectedToMongo } from '../config/db.js';
import { mockStore, saveStore } from '../utils/mockStore.js';

// @desc    Get all habits
// @route   GET /api/habits
// @access  Private / Public in dev
export const getHabits = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      const habits = await Habit.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: habits.length, data: habits });
    }
    return res.status(200).json({ success: true, count: mockStore.habits.length, data: mockStore.habits });
  } catch (error) {
    next(error);
  }
};

// @desc    Create habit
// @route   POST /api/habits
// @access  Private
export const createHabit = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Habit name is required' });
    }

    const habitData = {
      name,
      category: category || 'Personal',
      streak: 1,
      completedToday: true,
      history: [false, false, false, false, false, false, true]
    };

    if (isConnectedToMongo) {
      const habit = await Habit.create({ ...habitData, user: req.user?._id });
      return res.status(201).json({ success: true, data: habit });
    } else {
      const newHabit = { _id: `h-${Date.now()}`, id: `h-${Date.now()}`, ...habitData };
      mockStore.habits.push(newHabit);
      saveStore();
      return res.status(201).json({ success: true, data: newHabit });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle habit status today
// @route   PUT /api/habits/:id
// @access  Private
export const updateHabit = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const habit = await Habit.findById(id);
      if (!habit) {
        return res.status(404).json({ success: false, message: 'Habit not found' });
      }

      const nextState = !habit.completedToday;
      habit.completedToday = nextState;
      habit.streak = nextState ? habit.streak + 1 : Math.max(0, habit.streak - 1);
      habit.history[habit.history.length - 1] = nextState;
      await habit.save();

      return res.status(200).json({ success: true, data: habit });
    } else {
      const index = mockStore.habits.findIndex(h => h._id === id || h.id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Habit not found' });
      }

      const h = mockStore.habits[index];
      const nextState = !h.completedToday;
      h.completedToday = nextState;
      h.streak = nextState ? h.streak + 1 : Math.max(0, h.streak - 1);
      const nextHist = [...h.history];
      nextHist[nextHist.length - 1] = nextState;
      h.history = nextHist;
      saveStore();

      return res.status(200).json({ success: true, data: h });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
export const deleteHabit = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      await Habit.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Habit removed' });
    } else {
      mockStore.habits = mockStore.habits.filter(h => h._id !== id && h.id !== id);
      saveStore();
      return res.status(200).json({ success: true, message: 'Habit removed' });
    }
  } catch (error) {
    next(error);
  }
};
