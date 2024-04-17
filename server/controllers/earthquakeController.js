import Earthquake from '../models/earthquakeModel.js';
import { fetchEarthquakeData } from '../services/usgsService.js';
import { connectToDatabase } from '../db/connection.js';

export async function fetchAndStoreEarthquakeData(req, res) {
    try {
      await connectToDatabase();
      
      const parameters = {
        format: "geojson",
        starttime: "2024-01-01",
        endtime: "2024-01-31",
        minmagnitude: 4.0,
        latitude: 34.052235,
        longitude: -118.243683,
        maxradiuskm: 100
      };
  
      const earthquakeData = await fetchEarthquakeData(parameters);
  
      if (!earthquakeData || earthquakeData.length === 0) {
        throw new Error('Failed to fetch earthquake data');
      }
  
      const earthquakesToInsert = earthquakeData.map(earthquake => ({
        magnitude: earthquake.properties.mag,
        location: earthquake.properties.place,
        time: new Date(earthquake.properties.time),
        coordinates: {
          type: "Point",
          coordinates: [
            earthquake.geometry.coordinates[0], //longitude
            earthquake.geometry.coordinates[1], //latitude
            earthquake.geometry.coordinates[2]  //depth
          ]
        },
      }));
  
      // Store data in mongodb
      await Earthquake.insertMany(earthquakesToInsert);

      // Verify data insertion by querying the database
      const insertedData = await Earthquake.find({});
      console.log('Inserted earthquake data:', insertedData);
  
      res.status(200).json({ message: 'Earthquake data fetched and stored successfully.' });
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
