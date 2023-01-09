import express from 'express';
const router = express.Router();

import storageController from '../controllers/storage.js';

/**
 * @swagger
 * /storage/backup:
 *   get:
 *     description: Backup storage using local files.
 *     responses:
 *       200:
 *         description: Returns message with status of backup.
 */
router.get('/backup', storageController.get);
  
export default router;