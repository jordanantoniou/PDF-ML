import express from 'express';
import cors from 'cors';
import nlp from './routes/nlp.js';
import storage from './routes/storage.js';
import status from './routes/status.js';
import { connectToDatabase } from './utils/mongo.js';

const app = express();

app.use(cors());
app.use('/status', status)
app.use('/nlp', nlp);
app.use('/storage', storage);

connectToDatabase();

app.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...');
});
