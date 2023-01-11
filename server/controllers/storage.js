import storageService from '../services/storage.js';

const upload = async (req, res, next) => {
    try {
        await storageService.upload();
        res.json({ message: 'Upload was successful' });
    } catch (e) {
        next(e);
    }
};

export default { upload };
