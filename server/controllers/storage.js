import storageService from '../services/storage.js';

const get = async (req, res, next) => {
    try {
        await storageService.backup();
        res.json({ message: 'Database backup was successful' });
    } catch (e) {
        next(e);
    }
};

export default { get };
