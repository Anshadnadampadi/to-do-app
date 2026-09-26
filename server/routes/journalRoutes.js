import express from 'express';
import {
  getJournals,
  createJournal,
  deleteJournal
} from '../controllers/journalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getJournals)
  .post(protect, createJournal);

router.route('/:id')
  .delete(protect, deleteJournal);

export default router;
