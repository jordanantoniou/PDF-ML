import express from 'express';
import cors from 'cors';
import { parsePDF } from './helpers/parsers.js';
import { predict, trainClassifier } from './npl-file-processor.js';
import { input, negativeTrainingData, positiveTrainingData } from './inputs.js';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  //temporarily reading from static file
  const pdfText = parsePDF('../test-document-130.pdf');
  predict(pdfText.toString());
  res.end();
});

trainClassifier(positiveTrainingData, negativeTrainingData);
predict(input);

app.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...');
});
