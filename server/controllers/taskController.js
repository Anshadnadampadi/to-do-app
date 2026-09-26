import { Task } from '../models/Task.js';
import { isConnectedToMongo } from '../config/db.js';
import { mockStore, saveStore } from '../utils/mockStore.js';

// @desc    Get all tasks with optional search & category filter
// @route   GET /api/tasks
// @access  Private / Public in dev
export const getTasks = async (req, res, next) => {
  try {
    const { category, search, priority, status } = req.query;

    if (isConnectedToMongo) {
      const query = {};
      if (category && category !== 'All') query.category = category;
      if (priority) query.priority = priority;
      if (status) query.status = status;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const tasks = await Task.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } else {
      let result = [...mockStore.tasks];
      if (category && category !== 'All') {
        result = result.filter(t => t.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)));
      }
      return res.status(200).json({ success: true, count: result.length, data: result });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const { title, description, time, date, category, priority, statusBadge, progress } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Please provide task title' });
    }

    const taskData = {
      title,
      description: description || '',
      time: time || '10:00 AM',
      timeLabel: time || '10:00 AM',
      date: date || '2025-11-27',
      category: category || 'Projects',
      priority: priority || 'High',
      statusBadge: statusBadge || 'In Progress',
      status: statusBadge === 'Completed' ? 'completed' : 'in-progress',
      progress: progress || 50,
      members: [{ name: 'Anshad', avatar: '/assets/maddox_avatar.jpg' }],
      joinedExtra: 1
    };

    if (isConnectedToMongo) {
      const task = await Task.create({
        ...taskData,
        user: req.user?._id
      });
      return res.status(201).json({ success: true, data: task });
    } else {
      const newTask = {
        _id: `task-${Date.now()}`,
        id: `task-${Date.now()}`,
        ...taskData
      };
      mockStore.tasks.unshift(newTask);
      saveStore();
      return res.status(201).json({ success: true, data: newTask });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      return res.status(200).json({ success: true, data: task });
    } else {
      const index = mockStore.tasks.findIndex(t => t._id === id || t.id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      mockStore.tasks[index] = { ...mockStore.tasks[index], ...req.body };
      saveStore();
      return res.status(200).json({ success: true, data: mockStore.tasks[index] });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      return res.status(200).json({ success: true, message: 'Task deleted' });
    } else {
      mockStore.tasks = mockStore.tasks.filter(t => t._id !== id && t.id !== id);
      saveStore();
      return res.status(200).json({ success: true, message: 'Task deleted' });
    }
  } catch (error) {
    next(error);
  }
};
