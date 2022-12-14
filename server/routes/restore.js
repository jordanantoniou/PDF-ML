import { Router } from 'express';
import { readFilesFromDirectory } from '../helpers/file.js';
import { ConfirmationStatement, Other } from '../models/file.js';

const app = Router();

const confirmationStatementDir = './backup/confirmation-statements';
const otherDir = './backup/other';

app.get('/restore', async (req, res) => {
  
  const confirmationStatementBuffers = await readFilesFromDirectory(confirmationStatementDir);
  const otherBuffers = await readFilesFromDirectory(otherDir);
  
  const confirmationStatements = confirmationStatementBuffers.map(buffer => new ConfirmationStatement({ file: buffer, prediction: 'confirmationStatement'}));
  const others = otherBuffers.map(buffer => new Other({ file: buffer, prediction: 'other'}));

  try {
    await ConfirmationStatement.deleteMany({});
    await ConfirmationStatement.insertMany(confirmationStatements);
    await Other.deleteMany({});
    await Other.insertMany(others);
  } catch (error) {
    console.log('Error restoring database...');
    throw error;
  }

  res.end();
});
  
export default app;