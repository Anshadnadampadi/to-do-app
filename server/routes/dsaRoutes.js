import express from 'express';
import { getDsa, addDsaProblem } from '../controllers/dsaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDsa);
router.post('/problem', protect, addDsaProblem);

export default router;
