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
      minmagnitude: 4.0,
      latitude: 34.052235,
      longitude: -118.243683,
      maxradiuskm: 100
    };

    // Fetch earthquake data from USGS API using the service function
    const earthquakeData = await fetchEarthquakeData(parameters);
    // console.log('Fetched earthquake data:', earthquakeData);
    earthquakeData.forEach(earthquake => {
      console.log('Coordinates:', earthquake.geometry.coordinates);
    });

    // Check if earthquakeData is empty or null
    if (!earthquakeData || earthquakeData.length === 0) {
      throw new Error('Failed to fetch earthquake data');
    }

    console.log('Fetched earthquake data:', earthquakeData);

    // Extract coordinates and other relevant information and store in MongoDB
    const earthquakesToInsert = earthquakeData.map(earthquake => ({
      magnitude: earthquake.properties.mag,
      location: earthquake.properties.place,
      time: new Date(earthquake.properties.time),
      coordinates: {
        type: "Point",
        coordinates: [
          earthquake.geometry.coordinates[0], // Longitude
          earthquake.geometry.coordinates[1], // Latitude
          earthquake.geometry.coordinates[2] // Depth
        ]
      },
    }));

    console.log('Mapped earthquake data:', earthquakesToInsert);

    // console.log('before insert:', earthquakesToInsert);
    // Store earthquake data in MongoDB
    await Earthquake.insertMany(earthquakesToInsert);

    // Verify data insertion by querying the database
    const insertedData = await Earthquake.find({});
    console.log('Inserted earthquake data:', insertedData);

    res.status(200).json({ message: 'Earthquake data fetched and stored successfully.' });
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
