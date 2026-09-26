import express from 'express';
import {
  getUploads,
  createUpload,
  deleteUpload
} from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getUploads)
  .post(protect, createUpload);

router.route('/:id')
  .delete(protect, deleteUpload);

export default router;
