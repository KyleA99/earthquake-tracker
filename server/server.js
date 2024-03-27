// This hasnt been updated since moving mongo to local.
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
// Use later...
// import records from "./routes/record.js";

const PORT = process.env.EXPRESS_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
// app.use("/record", records);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
