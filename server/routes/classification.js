import express from 'express';
const router = express.Router();

import classificationController from '../controllers/classification.js';

/**
 * @swagger
 * /status:
 *   get:
 *     description: Check the status of the application
 *     responses:
 *       200:
 *         description: Returns a message with application status
 */
router.get('/findAll', classificationController.get);

export default router;
