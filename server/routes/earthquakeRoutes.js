import { Router } from 'express';
import { fetchAndStoreEarthquakeData } from '../controllers/earthquakeController.js';

const router = Router();

router.get('/fetch-earthquake-data', fetchAndStoreEarthquakeData);

export default router;
