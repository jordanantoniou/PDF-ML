import express from 'express';
import cors from 'cors';
import { parsePDF } from './helpers/parsers.js';

const file = await parsePDF('./test/data/positive/ConfirmationStatement.pdf');

console.log(file);

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...')
});