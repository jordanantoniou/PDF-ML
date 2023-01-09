import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import nlp from './routes/nlp.js';
import storage from './routes/storage.js';
import status from './routes/status.js';
import { connectToDatabase } from './utils/mongo.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Class-ifier API",
      version: "1.0.0",
      description:
        "An application which uses OCR (Optical Character Recognision) and NLP (Natural Language Processing) to classify PDF files.",
    }
  },
  servers: [
    {
      url: 'http:localhost:8080'
    }
  ],
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


const app = express();

app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/status', status);
app.use('/nlp', nlp);
app.use('/storage', storage);

connectToDatabase();

app.listen(8080, async () => {
  console.log('Listening on http://localhost:8080...');
});
