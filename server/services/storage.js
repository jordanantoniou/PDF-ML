import { readFilesFromDir } from '../utils/util.js';
import { dropCollection, insertMany } from '../utils/mongo.js';
const trainingDataDir = './training-data';

const insert = async () => {
  const { readFiles: dirs } = await readFilesFromDir(trainingDataDir, true);

  for (const dir of dirs) {
    const collection = dir.directory.split(`${trainingDataDir}/`)[1];

    try {
      await dropCollection(collection);
    } catch(e) {
      console.error(`Error while removing ${collection} collection:`, e.message);
      throw e;
    };

    const documents = dir.readFiles.map(file => ({ file, prediction: collection }));

    try {
      await insertMany(documents, collection);
    } catch (e) {
      console.error(`Error while inserting files for ${collection} collection:`, e.message);
      throw e;
    }
  }
};

export default { insert };
