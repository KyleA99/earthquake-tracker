import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// This import statement doesnt work
import { connectToDatabase } from './db/connection.js';
// This import statement does work
import { echoTest } from './db/test.js';

/**
 * Loads environment variables from a specified path.
 */
function loadEnvVariables() {
  dotenv.config({ path: '../config.env' });
}
// Load environment variables before starting the server
loadEnvVariables();

// delete later, just testing to ensure I can import functions from other files into here.
function importTest() {
  console.log(echoTest());
}
importTest();

/**
 * Starts the server.
 * @returns {Promise<void>} A promise that resolves when the server has started successfully.
 */
async function startServer() {
  try {
    const PORT = process.env.PORT || "";
    // Confirms .env variables are imported properly
    console.log("PORT from .env:", process.env.PORT);
    const app = express();

    app.use(cors());
    app.use(express.json());

    // it's breaking here... (even when i comment this out, I get URI .env variable not found)
    await connectToDatabase();
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Add error handling
  }
}

startServer();
