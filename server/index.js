import express from 'express';
import cors from 'cors';
import predict from './routes/predict.js';
import restore from './routes/restore.js';
import { trainModel } from './helpers/npl.js';
import { connectToDatabase } from './helpers/mongo.js';

const app = express();

app.use(cors());
app.use(predict);
app.use(restore);

connectToDatabase();

await trainModel();

app.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...');
});
