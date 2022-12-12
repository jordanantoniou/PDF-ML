import express from 'express';
import cors from 'cors';
import { parsePDF } from './helpers/parsers.js';
import { predict, trainClassifier } from './npl-file-processor.js';
import { input, negativeTrainingData, positiveTrainingData } from './inputs.js';
import fs from 'fs';

const file = await parsePDF('./test/data/positive/ConfirmationStatement.pdf');

console.log(file);

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  //temporarily reading from static file
  fs.readFile('../test-document-130.pdf', (err, data) => {
    if (err) {
      console.log('Unable to read pdf file');
    } else {
      // TODO: read pdf content as string
      console.log(data);
      predict(data);
    }
  });
});

trainClassifier(positiveTrainingData, negativeTrainingData);
predict(input);

app.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...');
});
