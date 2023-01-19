import { readFilesFromDir } from '../utils/util.js';
import { dropAllCollections, insertMany } from '../utils/mongo.js';
const trainingDataDir = './training-data';

const insert = async () => {
  const { readFiles: dirs } = await readFilesFromDir(trainingDataDir, true);

  try {
    await dropAllCollections();
  } catch (e) {
    console.error(
      `Error while dropping collections`,
      e.message,
    );
    throw e;
  }

  for (const dir of dirs) {
    const collection = dir.directory.split(`${trainingDataDir}/`)[1];

    const documents = dir.readFiles.map((file) => ({
      file,
      prediction: collection,
    }));

    try {
      await insertMany(documents, collection);
    } catch (e) {
      console.error(
        `Error while inserting files for ${collection} collection:`,
        e.message,
      );
      throw e;
    }
  }
};

export default { insert };
