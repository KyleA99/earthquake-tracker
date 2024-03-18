import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: '../../config.env' });

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db("EarthquakeDataCluster");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err; // Rethrow the error to be handled by the caller
  }
}
connectToDatabase();