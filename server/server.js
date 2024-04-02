import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db/connection.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../config.env' });

const PORT = process.env.EXPRESS_PORT || 3000;
// console.log(process.env.EXPRESS_PORT);
// console.log(PORT);
const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to start server:', error);
  });
