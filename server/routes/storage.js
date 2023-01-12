import express from 'express';
const router = express.Router();

import storageController from '../controllers/storage.js';

/**
 * @swagger
 * /storage/insert:
 *   get:
 *     description: Insert training files to the database
 *     responses:
 *       200:
 *         description: Returns message with status of insert.
 */
router.get('/insert', storageController.insert);
  
export default router;