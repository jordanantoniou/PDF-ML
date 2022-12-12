import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...')
});