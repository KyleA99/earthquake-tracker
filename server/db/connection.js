import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: '../../config.env' });

// maybe utilize loadEnvVariables() in here also?

/**
 * Retrieves the MongoDB URI from environment variables.
 * @returns {string} The MongoDB URI.
 * @throws {Error} Throws an error if MONGODB_URI environment variable is not found.
 */
function getMongoURI() {
  const uri = process.env.MONGODB_URI;
  // console.log(uri);
  if (!uri) {
    throw new Error("MONGODB_URI environment variable not found.");
  }
  return uri;
}

// Might be issue with this variable persisting through application execution.
// Wrap in function maybe?
const client = new MongoClient(getMongoURI(), {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Establishes a connection to the MongoDB database.
 * @returns {Promise<MongoClient>} A promise that resolves to the connected MongoClient.
 * @throws {Error} Throws an error if connection to MongoDB fails.
 */
export async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client.db("EarthquakeDataCluster");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

// Gets called in server.js, left here for testing mongodb connection individually
// connectToDatabase();
