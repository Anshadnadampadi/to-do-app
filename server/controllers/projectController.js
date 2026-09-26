import { Project } from '../models/Project.js';
import { isConnectedToMongo } from '../config/db.js';
import { mockStore, saveStore } from '../utils/mockStore.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private / Public in dev
export const getProjects = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      const projects = await Project.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    }
    return res.status(200).json({ success: true, count: mockStore.projects.length, data: mockStore.projects });
  } catch (error) {
    next(error);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res, next) => {
  try {
    const { name, description, category, progress, status, githubUrl, liveUrl, techStack } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Project name is required' });
    }

    const projData = {
      name,
      description: description || '',
      category: category || 'Full Stack',
      progress: progress || 20,
      status: status || 'Active',
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      techStack: techStack || ['React', 'Node.js']
    };

    if (isConnectedToMongo) {
      const project = await Project.create({ ...projData, user: req.user?._id });
      return res.status(201).json({ success: true, data: project });
    } else {
      const newProj = { _id: `proj-${Date.now()}`, id: `proj-${Date.now()}`, ...projData };
      mockStore.projects.unshift(newProj);
      saveStore();
      return res.status(201).json({ success: true, data: newProj });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      const proj = await Project.findByIdAndUpdate(id, req.body, { new: true });
      if (!proj) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, data: proj });
    } else {
      const index = mockStore.projects.findIndex(p => p._id === id || p.id === id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Project not found' });
      mockStore.projects[index] = { ...mockStore.projects[index], ...req.body };
      saveStore();
      return res.status(200).json({ success: true, data: mockStore.projects[index] });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      await Project.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Project deleted' });
    } else {
      mockStore.projects = mockStore.projects.filter(p => p._id !== id && p.id !== id);
      saveStore();
      return res.status(200).json({ success: true, message: 'Project deleted' });
    }
  } catch (error) {
    next(error);
  }
};
