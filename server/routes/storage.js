import express from 'express';
const router = express.Router();
import multer from 'multer';

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

router.get('/backup', storageController.get);
router.post('/upload', upload.single('file'), storageController.saveFile);

export default router;
