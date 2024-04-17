import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db/connection.js';
import earthquakeRouter from './routes/earthquakeRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../config.env') });

// const databaseName = process.env.DB_NAME || 'test';
// console.log(databaseName);

const PORT = process.env.EXPRESS_PORT || 3000;
console.log(PORT);
const app = express();

app.use(cors());
app.use(express.json());
app.use('/earthquakes', earthquakeRouter);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to start server:', error);
  });
