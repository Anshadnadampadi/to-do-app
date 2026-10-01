import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  clearAllTasks
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getTasks)
  .post(protect, createTask)
  .delete(protect, clearAllTasks);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
