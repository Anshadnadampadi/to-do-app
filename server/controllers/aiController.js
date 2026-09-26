import { AiProgress } from '../models/AiProgress.js';
import { isConnectedToMongo } from '../config/db.js';
import { mockStore, saveStore } from '../utils/mockStore.js';

// @desc    Get AI Roadmap topics
// @route   GET /api/ai
// @access  Public / Private
export const getAiRoadmap = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      let ai = await AiProgress.findOne();
      if (!ai) {
        ai = await AiProgress.create({ topics: mockStore.aiTopics });
      }
      return res.status(200).json({ success: true, count: ai.topics.length, data: ai.topics });
    }
    return res.status(200).json({ success: true, count: mockStore.aiTopics.length, data: mockStore.aiTopics });
  } catch (error) {
    next(error);
  }
};

// @desc    Update AI Roadmap topic status
// @route   PUT /api/ai/topic/:id
// @access  Private
export const updateAiTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const progress = status === 'Completed' ? 100 : status === 'Learning' ? 60 : 0;

    if (isConnectedToMongo) {
      const ai = await AiProgress.findOne();
      if (ai) {
        const topic = ai.topics.id(id);
        if (topic) {
          topic.status = status;
          topic.progress = progress;
          await ai.save();
          return res.status(200).json({ success: true, data: topic });
        }
      }
    }

    const index = mockStore.aiTopics.findIndex(t => t.id === id);
    if (index !== -1) {
      mockStore.aiTopics[index].status = status;
      mockStore.aiTopics[index].progress = progress;
      saveStore();
      return res.status(200).json({ success: true, data: mockStore.aiTopics[index] });
    }

    return res.status(404).json({ success: false, message: 'Topic not found' });
  } catch (error) {
    next(error);
  }
};
