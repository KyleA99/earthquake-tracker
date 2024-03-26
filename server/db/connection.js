import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({ path: '../../config.env' });

const uri = process.env.LOCAL_URI;

/**
 * Connects to the MongoDB database.
 * @async
 * @function connectToDatabase
 * @returns {Promise} A Promise that resolves once the connection is established.
 */
async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {});
        console.log('Connected to MongoDB!!!');

        // Import schema/model here?  Check other branches for that code...
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();
