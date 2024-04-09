import { Router } from 'express';

import Earthquake from '../models/earthquakeModel.js';
import { fetchEarthquakeData } from '../services/usgsService.js';
import { connectToDatabase } from '../db/connection.js';

const router = Router();

// Route to fetch earthquake data from USGS API and store it in MongoDB
router.get('/fetch-earthquake-data', async (req, res) => {
  try {
    await connectToDatabase();
    
    // STATIC parameters for your query
    const parameters = {
      format: "geojson",
      starttime: "2024-01-01",
      endtime: "2024-01-31",
      minmagnitude: 1.0,
      latitude: 34.052235,
      longitude: -118.243683,
      maxradiuskm: 100
    };

    // Fetch earthquake data from USGS API using the service function
    const earthquakeData = await fetchEarthquakeData(parameters);
    // console.log('Fetched earthquake data:', earthquakeData);

    // Check if earthquakeData is empty or null
    if (!earthquakeData || earthquakeData.length === 0) {
      throw new Error('Failed to fetch earthquake data');
    }

    // Store earthquake data in MongoDB
    await Earthquake.insertMany(earthquakeData);

    res.status(200).json({ message: 'Earthquake data fetched and stored successfully.' });
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
