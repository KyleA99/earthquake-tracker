import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({ path: '../../config.env' });

const uri = process.env.LOCAL_URI;

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
