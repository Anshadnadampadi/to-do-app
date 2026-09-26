import { DsaProgress } from '../models/DsaProgress.js';
import { isConnectedToMongo } from '../config/db.js';
import { mockStore, saveStore } from '../utils/mockStore.js';

// @desc    Get DSA statistics & recent problems
// @route   GET /api/dsa
// @access  Public / Private
export const getDsa = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      let dsa = await DsaProgress.findOne();
      if (!dsa) {
        dsa = await DsaProgress.create({
          totalSolved: mockStore.dsa.totalSolved,
          easy: mockStore.dsa.easy,
          medium: mockStore.dsa.medium,
          hard: mockStore.dsa.hard,
          platforms: mockStore.dsa.platforms,
          recentProblems: mockStore.dsa.recentProblems
        });
      }
      return res.status(200).json({ success: true, data: dsa });
    }
    return res.status(200).json({ success: true, data: mockStore.dsa });
  } catch (error) {
    next(error);
  }
};

// @desc    Log a newly solved problem
// @route   POST /api/dsa/problem
// @access  Private
export const addDsaProblem = async (req, res, next) => {
  try {
    const { name, platform, difficulty, timeTaken, notes, link } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Problem name is required' });
    }

    const problemObj = {
      id: `dsa-${Date.now()}`,
      name,
      platform: platform || 'LeetCode',
      difficulty: difficulty || 'Medium',
      timeTaken: timeTaken || '20m',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: notes || 'Practice problem',
      link: link || '#'
    };

    if (isConnectedToMongo) {
      let dsa = await DsaProgress.findOne();
      if (!dsa) dsa = new DsaProgress();

      dsa.totalSolved += 1;
      if (difficulty === 'Easy') dsa.easy += 1;
      else if (difficulty === 'Medium') dsa.medium += 1;
      else if (difficulty === 'Hard') dsa.hard += 1;

      dsa.recentProblems.unshift(problemObj);
      await dsa.save();

      return res.status(201).json({ success: true, data: dsa });
    } else {
      mockStore.dsa.totalSolved += 1;
      if (difficulty === 'Easy') mockStore.dsa.easy += 1;
      else if (difficulty === 'Medium') mockStore.dsa.medium += 1;
      else if (difficulty === 'Hard') mockStore.dsa.hard += 1;

      mockStore.dsa.recentProblems.unshift(problemObj);
      saveStore();
      return res.status(201).json({ success: true, data: mockStore.dsa });
    }
  } catch (error) {
    next(error);
  }
};
