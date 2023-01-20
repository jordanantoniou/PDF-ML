import express from 'express';
const router = express.Router();
import multer from 'multer';
import nlp from '../controllers/nlp';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './test/data/mocks');
  },
  filename: function (req, file, cb) {
    console.log('file ', file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

import storageController from '../controllers/storage.js';
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), storageController.saveFile);
router.post('/classifyUploads', upload.single('file'), nlp.classify);

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
