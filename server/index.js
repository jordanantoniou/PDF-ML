import express from 'express';
import cors from 'cors';
import { parsePDF, readFilesFromDirectory } from './helpers/utils.js';
import { train, predict } from './npl-file-processor.js';

const app = express();

app.use(cors());

const confirmationStatements = await readFilesFromDirectory('./test/data/confirmation-statements');
const other = await readFilesFromDirectory('./test/data/other');

train(confirmationStatements, other);

app.get('/', async (req, res) => {
  const confirmationStatement = await parsePDF('./test/data/predict/CS2022.pdf');
  const other = await parsePDF('./test/data/predict/GA2021.pdf');

  predict(confirmationStatement);
  predict(other);
  
  res.end();
});


app.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...');
});
