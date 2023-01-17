import express from 'express';
const router = express.Router();

import statusController from '../controllers/status.js';

/**
 * @swagger
 * /status:
 *   get:
 *     description: Check the status of the application
 *     responses:
 *       200:
 *         description: Returns a message with application status
 */
router.get('/', statusController.get);

export default router;
