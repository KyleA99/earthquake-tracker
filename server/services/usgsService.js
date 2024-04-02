import http from 'http';

/**
 * Fetch earthquake data from USGS API.
 * @param {Object} parameters - Parameters for the earthquake query.
 * @returns {Promise<Object[]>} - Promise resolving to an array of earthquake features.
 * @throws {Error} - Throws an error if fetching earthquake data fails.
 */
export async function fetchEarthquakeData(parameters) {
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?${new URLSearchParams(parameters).toString()}`;

  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData.features);
        } catch (error) {
          reject(new Error('Error parsing earthquake data'));
        }
      });
    }).on('error', (error) => {
      reject(new Error('Error fetching earthquake data from USGS API'));
    });
  });
}
