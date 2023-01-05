import express from 'express';
const router = express.Router();

import storageController from '../controllers/storage.js';

router.get('/backup', storageController.get);
  
export default router;