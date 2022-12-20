import express from 'express';
const router = express.Router();

import nlpController from '../controllers/nlp.js';

router.get('/classify', nlpController.classify);

router.get('/train', nlpController.train);

export default router;
