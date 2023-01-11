import { readFilesFromDir } from '../utils/util.js';
import { createModel } from '../utils/mongo.js';

const uploadDir = './uploads';

const upload = async () => {
  const { readFiles: dirs } = await readFilesFromDir(uploadDir, true);

  for (const dir of dirs) {
    const collection = dir.directory.split('./uploads/')[1];
    const File = createModel(collection);

    try {
      await File.deleteMany({});
    } catch(e) {
      console.error(`Error while removing ${collection} collection:`, e.message);
      throw e;
    };

    const uploadFiles = dir.readFiles.map(file => {
      return new File({ file, prediction: collection });
    });

    try {
      await File.insertMany(uploadFiles);
    } catch (e) {
      console.error(`Error while inserting files for ${collection} collection:`, e.message);
      throw e;
    }
  }
};

export default { upload };
