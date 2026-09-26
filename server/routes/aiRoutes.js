import express from 'express';
import { getAiRoadmap, updateAiTopic } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAiRoadmap);
router.put('/topic/:id', protect, updateAiTopic);

export default router;
