import express from 'express';
const router = express.Router();

import statusController from '../controllers/status.js';

router.get('/', statusController.get);

export default router;
