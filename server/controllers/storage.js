import storageService from '../services/storage.js';

const insert = async (req, res, next) => {
    try {
        await storageService.insert();
        res.json({ message: 'Insert was successful' });
    } catch (e) {
        next(e);
    }
};

export default { insert };
