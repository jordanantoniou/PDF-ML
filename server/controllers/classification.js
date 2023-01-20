import { findAllByCollection } from '../utils/mongo.js';

const get = async (req, res, next) => {
  try {
    const classifications = await findAllByCollection('classification');
    res.json({ classifications: classifications });
  } catch (e) {
    res.status(500).json({ error: e });
    next(e);
  }
};

export default { get };
