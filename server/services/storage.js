import { readFilesFromDirectory } from '../utils/util.js';
import { ConfirmationStatement, Other } from '../models/file.js';

const confirmationStatementDir = './backup/confirmation-statements';
const otherDir = './backup/other';

const backup = async () => {

    const confirmationStatementBuffers = await readFilesFromDirectory(confirmationStatementDir);
    const otherBuffers = await readFilesFromDirectory(otherDir);
    
    const confirmationStatements = confirmationStatementBuffers.map(buffer => new ConfirmationStatement({ file: buffer, prediction: 'confirmationStatement'}));
    const others = otherBuffers.map(buffer => new Other({ file: buffer, prediction: 'other'}));
  
    try {
      await ConfirmationStatement.deleteMany({});
      await ConfirmationStatement.insertMany(confirmationStatements);
      await Other.deleteMany({});
      await Other.insertMany(others);
    } catch (e) {
      console.error('Error while backing up storage: ', e.message)
      throw e;
    }
};

export default { backup };
