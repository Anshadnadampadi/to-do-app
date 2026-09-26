import { Upload } from '../models/Upload.js';
import { isConnectedToMongo } from '../config/db.js';
import { mockStore, saveStore } from '../utils/mockStore.js';

// @desc    Get all resource uploads
// @route   GET /api/uploads
// @access  Public / Private
export const getUploads = async (req, res, next) => {
  try {
    const { type } = req.query;
    if (isConnectedToMongo) {
      const query = type && type !== 'All' ? { type } : {};
      const uploads = await Upload.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: uploads.length, data: uploads });
    }

    let result = [...mockStore.uploads];
    if (type && type !== 'All') {
      result = result.filter(u => u.type.toLowerCase() === type.toLowerCase());
    }
    return res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Create / store upload entry
// @route   POST /api/uploads
// @access  Private
export const createUpload = async (req, res, next) => {
  try {
    const { title, type, size, url } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Resource title is required' });
    }

    const uploadData = {
      title,
      type: type || 'PDFs',
      size: size || '500 KB',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      url: url || '#'
    };

    if (isConnectedToMongo) {
      const file = await Upload.create({ ...uploadData, user: req.user?._id });
      return res.status(201).json({ success: true, data: file });
    } else {
      const newFile = { _id: `up-${Date.now()}`, id: `up-${Date.now()}`, ...uploadData };
      mockStore.uploads.unshift(newFile);
      saveStore();
      return res.status(201).json({ success: true, data: newFile });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete upload
// @route   DELETE /api/uploads/:id
// @access  Private
export const deleteUpload = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      await Upload.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Resource removed from vault' });
    } else {
      mockStore.uploads = mockStore.uploads.filter(u => u._id !== id && u.id !== id);
      saveStore();
      return res.status(200).json({ success: true, message: 'Resource removed from vault' });
    }
  } catch (error) {
    next(error);
  }
};
