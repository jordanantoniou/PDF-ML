import { Router } from 'express';
import { parsePDF } from '../helpers/file.js';
import { predict } from '../helpers/npl.js';

const app = Router();

const confirmationPredictionDir = './test/data/predict/CS2022.pdf';
const otherPredictionDir = './test/data/predict/O-017.pdf';

app.get('/', async (req, res) => {
  const confirmationStatement = await parsePDF(confirmationPredictionDir);
  const other = await parsePDF(otherPredictionDir);

  const confirmationPrediction = predict(confirmationStatement);
  const otherPrediction = predict(other);

  //TODO: Pass in filename to response object when predicting dynamic file
  res.send([confirmationPrediction, otherPrediction]);
});

export default app;
