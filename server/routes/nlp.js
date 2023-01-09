import express from 'express';
const router = express.Router();

import nlpController from '../controllers/nlp.js';

/**
 * @swagger
 * /nlp/classify:
 *   get:
 *     description: Classify a PDF file
 *     responses:
 *       200:
 *         description: Returns the classification
 */
router.get('/classify', nlpController.classify);

/**
 * @swagger
 * /nlp/train:
 *   get:
 *     description: Train the NLP classifier
 *     responses:
 *       200:
 *         description: Returns a message when training is successful with accuracy.
 */
router.get('/train', nlpController.train);

export default router;
