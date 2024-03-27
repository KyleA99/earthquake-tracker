import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db/connection.js';
// Use later...
// import records from "./routes/record.js";

dotenv.config();

const PORT = process.env.EXPRESS_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
// app.use("/record", records);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to start server:', error);
  });
