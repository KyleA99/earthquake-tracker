import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../config.env') });

const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const databaseName = process.env.DB_NAME || 'test';
console.log(databaseName);

const uri = `mongodb://${mongoHost}:${mongoPort}/${databaseName}`;

/**
 * Connects to the MongoDB database.
 * @async
 * @function connectToDatabase
 * @returns {Promise} A Promise that resolves once the connection is established.
 */
export async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {});
        console.log('Connected to MongoDB!!!');

        // Return a resolved promise to indicate successful connection
        return Promise.resolve();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Return a rejected promise to indicate connection failure
        return Promise.reject(error);
    }
}

export { uri };
