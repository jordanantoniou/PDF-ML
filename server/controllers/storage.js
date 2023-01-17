import storageService from '../services/storage.js';

const saveFile = async (req, res, next) => {
  try {
    res.json({ message: 'File saved successfuly' });
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  try {
    await storageService.insert();
    res.json({ message: 'Insert was successful' });
  } catch (e) {
    next(e);
  }
};

export default { insert, saveFile };
