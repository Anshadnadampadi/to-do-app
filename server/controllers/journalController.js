import { Journal } from '../models/Journal.js';
import { isConnectedToMongo } from '../config/db.js';
import { mockStore, saveStore } from '../utils/mockStore.js';

// @desc    Get all daily reflection journal entries
// @route   GET /api/journal
// @access  Private / Public in dev
export const getJournals = async (req, res, next) => {
  try {
    const { search } = req.query;

    if (isConnectedToMongo) {
      const query = {};
      if (search) {
        query.$or = [
          { q1: { $regex: search, $options: 'i' } },
          { q2: { $regex: search, $options: 'i' } },
          { q3: { $regex: search, $options: 'i' } },
          { q4: { $regex: search, $options: 'i' } }
        ];
      }
      const journals = await Journal.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: journals.length, data: journals });
    } else {
      let result = [...mockStore.journals];
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(j =>
          (j.q1 && j.q1.toLowerCase().includes(q)) ||
          (j.q2 && j.q2.toLowerCase().includes(q)) ||
          (j.q3 && j.q3.toLowerCase().includes(q)) ||
          (j.q4 && j.q4.toLowerCase().includes(q)) ||
          (j.date && j.date.toLowerCase().includes(q))
        );
      }
      return res.status(200).json({ success: true, count: result.length, data: result });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create daily journal reflection
// @route   POST /api/journal
// @access  Private
export const createJournal = async (req, res, next) => {
  try {
    const { mood, productivityScore, q1, q2, q3, q4 } = req.body;

    const journalData = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      mood: mood || '🔥 High Focus',
      productivityScore: productivityScore || 9,
      q1: q1 || '',
      q2: q2 || '',
      q3: q3 || '',
      q4: q4 || ''
    };

    if (isConnectedToMongo) {
      const entry = await Journal.create({ ...journalData, user: req.user?._id });
      return res.status(201).json({ success: true, data: entry });
    } else {
      const newEntry = { _id: `j-${Date.now()}`, id: `j-${Date.now()}`, ...journalData };
      mockStore.journals.unshift(newEntry);
      saveStore();
      return res.status(201).json({ success: true, data: newEntry });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete journal entry
// @route   DELETE /api/journal/:id
// @access  Private
export const deleteJournal = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo) {
      await Journal.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Journal entry deleted' });
    } else {
      mockStore.journals = mockStore.journals.filter(j => j._id !== id && j.id !== id);
      saveStore();
      return res.status(200).json({ success: true, message: 'Journal entry deleted' });
    }
  } catch (error) {
    next(error);
  }
};
