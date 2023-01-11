import express from 'express';
const router = express.Router();

import storageController from '../controllers/storage.js';

/**
 * @swagger
 * /storage/upload:
 *   get:
 *     description: Upload PDF files to MongoDB
 *     responses:
 *       200:
 *         description: Returns message with status of upload.
 */
router.get('/upload', storageController.upload);
  
export default router;